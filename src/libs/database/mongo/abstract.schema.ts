import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude, Transform, Type } from 'class-transformer';

export const defaultSchemaOptions = { versionKey: false, virtuals: true, timestamps: true, toJSON: { virtuals: true } };

@Schema(defaultSchemaOptions)
export class AbstractDocument {
  @Exclude()
  @Type(() => String)
  @Prop({ type: Number })
  @ApiProperty({ name: 'id', type: String })
  @Transform(({ value }) => value.toString())
  _id: number;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
