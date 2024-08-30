import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OpenAiModelsList } from './models/open.ai.models.list';
import { OpenAiCompletionService } from './services/completion.service';
import { PromptsService } from 'src/modules/ai/services';

import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private readonly client: OpenAIApi;
  public completionService: OpenAiCompletionService;

  constructor(
    private readonly configService: ConfigService,
    private readonly promptsService: PromptsService,
  ) {
    const configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
      organization: configService.get('OPENAI_ORG_ID'),
    });

    this.client = new OpenAIApi(configuration);
    this.completionService = new OpenAiCompletionService(this.client, this.promptsService);
  }

  async listModels(): Promise<OpenAiModelsList[]> {
    return this.client
      .listModels()
      .then((response) => response.data)
      .then((response) => response.data);
  }
}
