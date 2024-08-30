import { plainToClass } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import semver from 'semver';

class EnvironmentVariables {
  @IsNumber()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  APP_ENV: 'development' | 'production';

  @IsString()
  OPENAI_ORG_ID: string;

  @IsString()
  OPENAI_API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

@ValidatorConstraint({ name: 'semver', async: false })
export class SemVerValidatorConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    if (typeof value !== 'string') {
      return false; // If it's not a string, it's not a valid SemVer.
    }

    return semver.valid(value) !== null;
  }

  defaultMessage() {
    return 'The provided version must be a valid SemVer version.';
  }
}
