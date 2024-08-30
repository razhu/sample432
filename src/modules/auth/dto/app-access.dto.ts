import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AppAccessDTO {
  constructor(email: string) {
    this.email = email;
  }

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
