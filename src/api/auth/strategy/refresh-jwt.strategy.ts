import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../../core/config/config';
import { UserService } from 'src/api/users/user.service';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { GetIpInterceptor } from 'src/shared/interceptors/getIp.interceptor';

const CONFIG = config();

@Injectable()
@UseInterceptors(GetIpInterceptor)
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: any, req: Request) {
    // if (req.ip !== payload.device) {
    //   ResponseFormat.failureResponse(
    //     'Invalid credentials',
    //     HttpStatus.UNAUTHORIZED,
    //     401,
    //   );
    // }

    const user = await this.usersService.getById(payload.sub);

    delete user.password;
    return user;
  }
}
