import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseFormat } from 'src/shared';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class StoreAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      ResponseFormat.failureResponse(
        'You are not authorized to perform this action',
        HttpStatus.UNAUTHORIZED,
        401,
      );
    }

    const userRoles = user.role.split(', ');

    const authorizedRoles = ['STORE'];

    const isAuthorized = authorizedRoles.some((role) =>
      userRoles.includes(role),
    );

    if (!isAuthorized) {
      ResponseFormat.failureResponse(
        'You are not authorized to perform this action',
        HttpStatus.UNAUTHORIZED,
        401,
      );
    }
    return user;
  }
}

@Injectable()
export class CustomerAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      ResponseFormat.failureResponse(
        'You are not authorized to perform this action',
        HttpStatus.UNAUTHORIZED,
        401,
      );
    }

    const userRoles = user.role.split(', ');

    const authorizedRoles = ['CUSTOMER'];

    const isAuthorized = authorizedRoles.some((role) =>
      userRoles.includes(role),
    );

    if (!isAuthorized) {
      ResponseFormat.failureResponse(
        'You are not authorized to perform this action',
        HttpStatus.UNAUTHORIZED,
        401,
      );
    }
    return user;
  }
}
