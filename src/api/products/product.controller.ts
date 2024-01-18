import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Request,
  Response,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto';
import { ProductService } from './product.service';
import { ResponseFormat } from 'src/shared';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/roles.enums';
import { JwtAuthGuard, StoreAuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiCreatedResponse()
  @ApiBody({ type: CreateProductDto })
  @Post()
  async createProduct(
    @Request() req,
    @Response() res,
    @Body() productDto: CreateProductDto,
  ) {
    try {
      const createdProduct = await this.productService.createProduct(
        productDto,
      );

      ResponseFormat.successResponse(
        res,
        createdProduct,
        'Created Successfully',
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
    description: 'Products retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get()
  async getProducts(@Response() res) {
    try {
      const products = await this.productService.getProducts();

      ResponseFormat.successResponse(res, products, 'Created Successfully');
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
    description: 'Product retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get(':id')
  async getProductById(@Response() res, @Param('id') id: string) {
    try {
      const product = await this.productService.getProductById(id);

      ResponseFormat.successResponse(res, product, 'Fetched Successfully');
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
    description: 'Product updated successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @Roles(Role.STORE)
  @ApiOkResponse()
  @ApiBody({ type: CreateProductDto })
  @Put(':id')
  async updateProduct(
    @Response() res,
    @Param('id') id: string,
    @Body() productDto: CreateProductDto,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        id,
        productDto,
      );

      ResponseFormat.successResponse(
        res,
        updatedProduct,
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
    description: 'Products deleted successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiOkResponse()
  @Delete(':id')
  async deleteProduct(@Response() res, @Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.productService.deleteProduct(id);
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
  @Get('search')
  async searchProducts(@Response() res, @Query() query: any) {
    try {
      const { categoryName, tagName } = query;

      let result;
      if (categoryName && tagName) {
        result = this.productService.searchProducts({ categoryName, tagName });
      } else if (categoryName) {
        result = this.productService.searchProducts({ categoryName });
      } else if (tagName) {
        result = this.productService.searchProducts({ tagName });
      } else {
        result = [];
      }

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
