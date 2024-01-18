import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/datasource';
import { ApiModule } from './api';
import { AppController } from './app.controller';
import { GetIpInterceptor } from './shared/interceptors/getIp.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ApiModule],
  controllers: [AppController],
  providers: [GetIpInterceptor],
})
export class AppModule {}
