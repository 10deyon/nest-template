import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Response,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ResponseFormat } from 'src/shared';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/shared/enums/roles.enums';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard, StoreAuthGuard } from '../auth/guards';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateOrderDto })
  @Post()
  async createProductCategory(
    @Request() req,
    @Response() res,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const { sub: customerId } = req.user;
    try {
      const order = await this.orderService.create(createOrderDto, customerId);

      ResponseFormat.successResponse(res, order, 'Created Successfully');
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
    description: 'Orders retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get()
  async getProductCategories(@Response() res) {
    try {
      const order = await this.orderService.index();

      ResponseFormat.successResponse(res, order, 'Created Successfully');
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
    description: 'Order retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get(':id')
  async getProductCategoryById(@Response() res, @Param('id') id: string) {
    try {
      const order = await this.orderService.getById(id);

      ResponseFormat.successResponse(res, order, 'Fetched Successfully');
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
    description: 'Order updated successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @Roles(Role.STORE)
  @ApiOkResponse()
  @ApiBody({ type: CreateOrderDto })
  @Put(':id')
  async updateProductCategory(
    @Response() res,
    @Param('id') id: string,
    @Body() updateOrderDto: CreateOrderDto,
  ) {
    try {
      const updatedOrder = await this.orderService.update(id, updateOrderDto);

      ResponseFormat.successResponse(res, updatedOrder, 'Updated Successfully');
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
    description: 'Order deleted successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, StoreAuthGuard)
  @ApiOkResponse()
  @Delete(':id')
  async deleteProductCategory(@Response() res, @Param('id') id: string) {
    try {
      await this.orderService.delete(id);
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
}
