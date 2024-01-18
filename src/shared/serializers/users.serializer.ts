import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Exclude, plainToClass } from 'class-transformer';

export class SerializedUser {
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}

// plainToClass(SerializedUser, User); 1.
// 2
// @UseInterceptors(ClassSerializerInterceptor)

// const user = find the user data
// return new SerializedUser(user)
