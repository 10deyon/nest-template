import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, HttpStatus, Injectable, Ip } from '@nestjs/common';
import { UserService } from 'src/api/users/user.service';
import config from '../../../core/config/config';
import { Request } from 'express';
import { ResponseFormat } from 'src/shared';

const CONFIG = config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // THIS HELPS YOU TO GET THE ACCESS TOKEN
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_SECRET,
    });
  }

  // ONCE THE CONSTRUCTOR RUNS, IT PASSES THE REQUEST TO THE VALIDATE METHOD
  // THE PAYLOAD IS THE DECODED DATA FROM THE ACCESS TOKEN
  async validate(req: Request, payload: any) {
    // console.log(req);
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
