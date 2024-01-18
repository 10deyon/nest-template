import {
  Controller,
  UseGuards,
  Request,
  Get,
  Body,
  Response,
  HttpStatus,
  Put,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { ResponseFormat } from 'src/shared';
import { JwtAuthGuard, StoreAuthGuard } from '../auth/guards';
// import { GetIpInterceptor } from 'src/shared/interceptors/getIp.interceptor';
import { UpgradeAccountDto } from './dto/upgrade-account.dto';
import { Role } from 'src/shared/enums/roles.enums';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ChangePasswordDto, updateProfileDto } from './dto/update.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201 })
  @ApiBody({ type: UpgradeAccountDto })
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @Roles(Role.STORE, Role.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  @Post('/upgrade-account')
  async upgrade(
    @Response() res,
    @Request() req,
    @Body() upgradeAccountDto: UpgradeAccountDto,
  ) {
    try {
      const { user } = req;
      const accountCreated = await this.userService.upgradeAccount(
        upgradeAccountDto,
        user,
      );

      ResponseFormat.successResponse(res, accountCreated, 'Account updgraded');
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

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiQuery({ name: 'type' })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getProfile(
    @Request() req,
    @Response() res,
    @Query('type') type: string,
  ) {
    try {
      const { user } = req;
      const userProfile = await this.userService.profile(user);

      ResponseFormat.successResponse(
        res,
        userProfile,
        'Profile Retrieved Successfully',
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

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Request() req, @Response() res) {
    try {
      const { user } = req;
      const userProfile = await this.userService.profile(user);

      ResponseFormat.successResponse(
        res,
        userProfile,
        'Record Fetched Successfully',
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
    description: 'Record updated succesfully',
  })
  @ApiBody({ type: updateProfileDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  async updateDetails(
    @Request() req,
    @Response() res,
    @Body() body: updateProfileDto,
  ) {
    try {
      const user = await this.userService.update(req.user.sub, body);

      ResponseFormat.successResponse(res, user, 'Record Fetched Successfully');
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
    description: 'Password updated succesfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ChangePasswordDto })
  @Put('update-password')
  async updatePassword(
    @Request() req,
    @Response() res,
    @Body() body: ChangePasswordDto,
  ) {
    try {
      await this.userService.update(req.user.sub, body);

      return ResponseFormat.sendResponse(res, 'Password updated successfully.');
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

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiResponse({
    status: 200,
    description: 'User records retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.STORE)
  @UseGuards(StoreAuthGuard)
  @Get()
  findAll(@Request() req) {
    return 'name';
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  // @Param('id', ParseUUIDPipe) id: string
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
