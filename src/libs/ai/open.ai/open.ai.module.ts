import { Module } from '@nestjs/common';

import { OpenAiService } from './open.ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from 'src/modules/database/entities/mysql';
import { AiModule } from 'src/modules/ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prompt]), AiModule],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
