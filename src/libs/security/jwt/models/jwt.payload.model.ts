import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/** Local Imports **/
import { JwtActorModel } from './jwt.actor.model';

export class JwtPayloadModel {
  @ApiProperty()
  @Type(() => JwtActorModel)
  actor: JwtActorModel;

  static fromRefreshTokenPayload(payload: Partial<JwtPayloadModel>): JwtPayloadModel {
    const newPayload = new JwtPayloadModel();
    newPayload.actor = new JwtActorModel();

    newPayload.actor.id = parseInt(payload.actor.id.toString());
    newPayload.actor.type = payload.actor.type;
    newPayload.actor.parent_id = payload.actor.parent_id;

    return newPayload;
  }
}
