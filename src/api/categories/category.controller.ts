import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Response,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { ResponseFormat } from 'src/shared';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/shared/enums/roles.enums';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard, StoreAuthGuard } from '../auth/guards';

@ApiTags('Product Categories')
@Controller('product-categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: 200,
    description: 'Category created successfully',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async createProductCategory(
    @Response() res,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const category = await this.categoryService.create(createCategoryDto);

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
    description: 'Categories retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get()
  async getProductCategories(@Response() res) {
    try {
      const category = await this.categoryService.index();

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
    description: 'Category retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get(':id')
  async getProductCategoryById(@Response() res, @Param('id') id: string) {
    try {
      const category = await this.categoryService.getById(id);

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
    description: 'Category updated successfully',
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
      const updatedCategory = await this.categoryService.update(
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
    description: 'Category deleted successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiOkResponse()
  @Delete(':id')
  async deleteProductCategory(@Response() res, @Param('id') id: string) {
    try {
      await this.categoryService.delete(id);
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
    description: 'Categories retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiQuery({ name: 'name' })
  @ApiQuery({ name: 'description' })
  @Get('search')
  async searchProductCategory(
    @Response() res,
    @Query('name') name: string,
    @Query('description') description: string,
  ) {
    try {
      const result = await this.categoryService.searchProductByCategory(
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
