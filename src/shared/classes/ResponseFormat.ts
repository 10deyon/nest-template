import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from './interfaces';

export class ResponseFormat {
  /**
   * Sends default JSON resonse to client
   * @param {*} code
   * @param {*} data
   * @param {*} message
   * @param {*} code
   */
  static successResponse(res: Response, data, message: string, code = 200) {
    const resData = {
      success: true,
      code,
      message,
      data: data,
    };
    res.status(HttpStatus.OK).json(resData);
  }

  /**
   * Sends error resonse to client
   * @param {*} data
   * @param {*} message
   * @param {*} status
   * @param {*} code
   */
  static failureResponse(
    // data: any,
    message: string,
    status: number,
    code: number,
  ): ResponseData {
    const resData = {
      success: false,
      code,
      message,
      // data: data,
    };

    throw new HttpException(resData, status);
    // throw new HttpException(data, HttpStatus[status]);
  }

  static sendResponse(res: Response, message: string, code = 200) {
    const resData = {
      success: true,
      code,
      message,
    };
    res.status(HttpStatus.OK).json(resData);
  }
}
