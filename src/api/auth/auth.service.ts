import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import config from '../../core/config/config';
import { JWTPayload } from 'src/shared';
import { StoreService } from '../stores/store.service';
import { LoginDto } from '../users/dto';
import { Role } from 'src/shared/enums/roles.enums';
import { compare, hash } from 'bcryptjs';

const CONFIG = config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier, password: string): Promise<any> {
    const user = await this.userService.findByPhoneOrEmail(identifier);

    if (user && (await user.correctPassword<string>(password, user.password))) {
      delete user.password;
      delete user.tempPassword;
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto, req: any) {
    const payload: JWTPayload = {
      device: req.ip,
      sub: req.user.id,
      email: req.user.email,
      phone_number: req.user.phone_number,
    };

    const user = await this.userService.profile(req.user);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: CONFIG.JWT_SECRET,
        expiresIn: CONFIG.JWT_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: CONFIG.JWT_REFRESH_SECRET,
        expiresIn: CONFIG.JWT_REFRESH_EXPIRATION,
      }),
    ]);

    return {
      user,
      type: 'Bearer',
      access_token: accessToken,
      expiresIn: CONFIG.JWT_EXPIRES_IN,
      refresh_token: refreshToken,
      refresh_token_expires_in: CONFIG.JWT_REFRESH_EXPIRATION,
    };
  }

  async refreshToken(req: any) {
    const payload: JWTPayload = {
      device: req.ip,
      sub: req.user.id,
      email: req.user.email,
      phone_number: req.user.phone_number,
    };

    return {
      type: 'Bearer',
      accessToken: await this.jwtService.signAsync(payload, {
        secret: CONFIG.JWT_SECRET,
        expiresIn: CONFIG.JWT_EXPIRES_IN,
      }),
      expiresIn: CONFIG.JWT_EXPIRES_IN,
    };
  }
}
