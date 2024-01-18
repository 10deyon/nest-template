import {
  Controller,
  Get,
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
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/roles.enums';
import { CustomerAuthGuard, JwtAuthGuard } from '../auth/guards/auth.guard';
import { DeliveryAddressService } from './delivery-address.service';
import { CreateAddressDto } from './dto';

@ApiTags('Delivery Addresses')
@Controller('delivery-addresses')
export class DeliveryAddressController {
  constructor(private readonly addressService: DeliveryAddressService) {}

  @ApiResponse({
    status: 201,
    description: 'Delivery Address created successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, CustomerAuthGuard)
  @ApiCreatedResponse()
  @ApiBody({ type: CreateAddressDto })
  @Post()
  async create(
    @Request() req,
    @Response() res,
    @Body() addressDto: CreateAddressDto,
  ) {
    try {
      const { sub: customerId } = req.user;
      const createdProduct = await this.addressService.create(
        customerId,
        addressDto,
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
    description: 'Delivery Address retrieved successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get(':id')
  async getProductById(@Response() res, @Param('id') id: string) {
    try {
      const product = await this.addressService.getById(id);

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
    description: 'Delivery Address updated successfully',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, CustomerAuthGuard)
  @Roles(Role.STORE)
  @ApiOkResponse()
  @ApiBody({ type: CreateAddressDto })
  @Put(':id')
  async updateProduct(
    @Response() res,
    @Param('id') id: string,
    @Body() addressDto: CreateAddressDto,
  ) {
    try {
      const updatedProduct = await this.addressService.update(id, addressDto);

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
    description: 'Delivery Address deleted successfully',
  })
  @ApiBearerAuth()
  @Roles(Role.STORE)
  @UseGuards(JwtAuthGuard, CustomerAuthGuard)
  @ApiOkResponse()
  @Delete(':id')
  async deleteProduct(@Response() res, @Param('id') id: string) {
    try {
      await this.addressService.delete(id);

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
