import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLogger } from 'src/core';
import config from '../core/config/config';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/user.controller';
import { UserService } from './users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  JwtStrategy,
  LocalStrategy,
  RefreshJwtStrategy,
} from './auth/strategy';
import { StoreService } from './stores/store.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CustomInterceptor } from 'src/shared/interceptors/custom.interceptor';
import { CategoryService } from './categories/category.service';
import { TagService } from './tags/tag.service';
import { ProductService } from './products/product.service';
import { ProductController } from './products/product.controller';
import { TagController } from './tags/tag.controller';
import { CategoryController } from './categories/category.controller';
import { StoreController } from './stores/store.controller';
import { CustomerService } from './customer/customer.service';
import {
  Category,
  CustomerProfile,
  Order,
  Product,
  StoreProfile,
  Tag,
  User,
} from 'src/entities';
import { OrderDetails } from 'src/entities/order-details.entity';
import { DeliveryAddress } from 'src/entities/develiver-address.entity';
import { OrderController } from './orders/order.controller';
import { OrderService } from './orders/order.service';
import { DeliveryAddressController } from './delivery_address/delivery-address.controller';
import { DeliveryAddressService } from './delivery_address/delivery-address.service';

const CONFIG = config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forFeature([
      User,
      StoreProfile,
      Tag,
      Category,
      Product,
      CustomerProfile,
      Order,
      OrderDetails,
      DeliveryAddress,
    ]),
  ],

  controllers: [
    AuthController,
    UsersController,
    ProductController,
    CategoryController,
    TagController,
    StoreController,
    OrderController,
    DeliveryAddressController,
  ],

  providers: [
    // TRANSFORM: STEP 3
    //HERE IS WHERE I SET UP THE PROVIDER TO INTERCEPT RESPONSES
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
      // You can make use of this custom interceptor also in place of the inbuilt interceptor
      // useClass: CustomInterceptor,
    },
    AuthService,
    UserService,
    StoreService,
    AppLogger,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    CategoryService,
    TagService,
    ProductService,
    CustomerService,
    OrderService,
    DeliveryAddressService,
  ],

  exports: [
    AuthService,
    UserService,
    StoreService,
    AppLogger,
    JwtModule,
    PassportModule,
    AppLogger,
    JwtStrategy,
    LocalStrategy,
    RefreshJwtStrategy,
    CategoryService,
    TagService,
    ProductService,
    CustomerService,
    OrderService,
    DeliveryAddressService,
  ],
})
export class ApiModule {}
