import { Controller, Get, Response } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseFormat } from './shared';

@Controller()
export class AppController {
  @ApiOkResponse()
  @Get('health')
  public getHealth(@Response() res) {
    ResponseFormat.successResponse(
      res,
      {},
      'Health OK! From Gatekeeper Service',
    );
  }
}
