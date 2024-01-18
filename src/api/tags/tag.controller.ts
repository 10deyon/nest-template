import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Response,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ResponseFormat } from 'src/shared';
import { CreateCategoryDto } from '../categories/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/roles.enums';
import { JwtAuthGuard, StoreAuthGuard } from '../auth/guards';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiCreatedResponse()
  @ApiBody({ type: CreateTagDto })
  @Post()
  async createProductCategory(
    @Response() res,
    @Body() createTagDto: CreateTagDto,
  ) {
    try {
      const category = await this.tagService.create(createTagDto);

      ResponseFormat.successResponse(res, category, 'Created Successfully');
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
    description: 'Tags retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get()
  async getProductCategories(@Response() res) {
    try {
      const category = await this.tagService.getProductCategories();

      ResponseFormat.successResponse(res, category, 'Successful');
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
    description: 'Tag retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get(':id')
  async getProductCategoryById(@Response() res, @Param('id') id: string) {
    try {
      const category = await this.tagService.getById(id);

      ResponseFormat.successResponse(res, category, 'Fetched Successfully');
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
    description: 'Tag updated successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @Roles(Role.STORE)
  @ApiOkResponse()
  @ApiBody({ type: CreateCategoryDto })
  @Put(':id')
  async updateProductCategory(
    @Response() res,
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    try {
      const updatedCategory = await this.tagService.update(
        id,
        updateCategoryDto,
      );

      ResponseFormat.successResponse(
        res,
        updatedCategory,
        'Updated Successfully',
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
    status: 204,
    description: 'Tag deleted successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiOkResponse()
  @Delete(':id')
  async deleteProductCategory(@Response() res, @Param('id') id: string) {
    try {
      await this.tagService.delete(id);
      ResponseFormat.sendResponse(res, 'Deleted Successfully');
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
    description: 'Products retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiQuery({ name: 'name' })
  @ApiQuery({ name: 'description' })
  @Get('search')
  async searchProductByTag(
    @Response() res,
    @Query('name') name: string,
    @Query('description') description: string,
  ) {
    try {
      const result = await this.tagService.searchProductByTag(
        name,
        description,
      );

      ResponseFormat.successResponse(res, result, 'Successful');
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
}
