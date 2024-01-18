import { Exclude, Expose } from 'class-transformer';

export class CreateUserResponseDto {
  id: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  // THIS MEANS YOU CAN PASS ANY OBJECT THAT MAY RESEMBLE THIS ACTUAL OBJECT
  constructor(partial: Partial<CreateUserResponseDto>) {
    Object.assign(this, partial);
  }

  // TRANSFORM: STEP 2
  //INSIDE THE CLASS, use this class as the return type
  //ALSO create a new instance of this class in your controller and pass in the object
  // new createUserResponseDto(payload)
  // THIS TRANSFORMS THE DATA
}
