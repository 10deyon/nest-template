import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { ResponseFormat } from 'src/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'identifier',
      passwordField: 'password',
    });
  }

  async validate(
    request: Request | any,
    identifier: string,
    password: string,
  ): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);

    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.validateUser(identifier, password);

    if (!user) {
      // throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      ResponseFormat.failureResponse(
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
        401,
      );
    }

    return user; // PASSPORT AUTOMATICALLY SAVES THIS USER IN THE req.user
  }
}
