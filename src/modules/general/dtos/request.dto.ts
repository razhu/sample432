import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { SemVerValidatorConstraint } from 'src/config/validation';
import { GravyWorkUserType } from '../types';
import { i18nValidationMessage } from 'nestjs-i18n';

export class AppVersionUpdateDto {
  @IsNotEmpty({ message: 'next_version is required' })
  @Validate(SemVerValidatorConstraint, {
    message: 'next_version must be a valid SemVer version',
  })
  next_version: string;
}

export class GenerateThumbnailDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IS_NUMBER') })
  id: number;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  userType: GravyWorkUserType;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  avatarKey: string;
}
