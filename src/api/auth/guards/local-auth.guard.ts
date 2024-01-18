import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
// LOGIN PROCESS - 2
// THIS WILL TRIGGER THE LOCAL STRATEGY
