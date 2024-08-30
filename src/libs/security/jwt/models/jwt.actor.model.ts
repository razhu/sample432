import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

/** Local Imports **/
import { JwtType } from '../enums';

export class JwtActorModel {
  @ApiProperty()
  @Type(() => Types.ObjectId)
  id: number;

  @ApiProperty()
  @Type(() => String)
  parent_id: string;

  @ApiProperty()
  @Type(() => String)
  type: JwtType;

  static fromRefreshTokenPayload(payload: Partial<JwtActorModel>): JwtActorModel {
    const newPayload = new JwtActorModel();
    newPayload.id = parseInt(payload.id.toString());
    newPayload.type = payload.type;
    newPayload.parent_id = payload.parent_id;

    return newPayload;
  }
}
