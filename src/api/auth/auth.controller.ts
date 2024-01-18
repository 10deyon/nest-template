import {
  Controller,
  Post,
  Body,
  Request,
  Response,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseFormat } from 'src/shared';
import { CreateUserDto, LoginDto } from '../users/dto';
import { UserService } from '../users/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import config from '../../core/config/config';
import { LocalAuthGuard } from './guards';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

const CONFIG = config();

@ApiTags('Authentication')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Succesfully registered',
  })
  @ApiCreatedResponse()
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async registration(@Response() res, @Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userService.createUser(createUserDto);

      ResponseFormat.successResponse(
        res,
        createdUser,
        'Successfully registered',
        201,
      );
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        ResponseFormat.failureResponse(
          error.message,
          error.getStatus(),
          error.getStatus(),
        );
      } else {
        ResponseFormat.failureResponse(
          'Oops! an error occured. Try again.',
          HttpStatus.INTERNAL_SERVER_ERROR,
          500,
        );
      }
    }
  }

  @UseGuards(LocalAuthGuard) // LOGIN PROCESS - 1
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
  })
  @ApiOkResponse()
  @Post('login')
  async login(@Request() req, @Response() res, @Body() loginDto: LoginDto) {
    try {
      const { user, ...token } = await this.authService.login(loginDto, req);

      ResponseFormat.successResponse(
        res,
        {
          user,
          token,
        },
        'Logged in successfully',
      );
    } catch (error) {
      if (error instanceof HttpException) {
        ResponseFormat.failureResponse(
          error.message,
          error.getStatus(),
          error.getStatus(),
        );
      } else {
        console.error(error);
        ResponseFormat.failureResponse(
          'Oops! an error occured. Try again.',
          HttpStatus.INTERNAL_SERVER_ERROR,
          500,
        );
      }
    }
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(LocalAuthGuard)
  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  async refrshToken(
    @Request() req,
    @Response() res,
    @Body() refreshToken: RefreshTokenDto,
  ) {
    const token = await this.authService.refreshToken(refreshToken);

    ResponseFormat.successResponse(res, token, 'Logged in successfully');
  }
}
