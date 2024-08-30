import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Moment } from 'moment';

export class CheckoutDTO {
  @IsNotEmpty()
  @IsDateString()
  shiftStart: Moment;

  @IsNotEmpty()
  @IsDateString()
  shiftEnd: Moment;

  @IsNotEmpty()
  @IsString()
  userStart: Moment;

  @IsNotEmpty()
  @IsString()
  userEnd: Moment;
}
