import { OpenAiChatCompletionResponse } from '../models/open.ai.chatcompletion.response';
import { CompletionWithUserDto } from 'src/modules/ai/dto/completion.dto';
import { PromptsService } from 'src/modules/ai/services';
import { PromptDto } from 'src/modules/ai/dto';
import { Injectable, Scope } from '@nestjs/common';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

type PromptDtoDictionary = Record<number, PromptDto[]>;

@Injectable({ scope: Scope.REQUEST })
export class OpenAiCompletionService {
  private readonly TURBO_MODEL = 'gpt-3.5-turbo-16k-0613';
  private readonly TEMPERATURE = 0.5;

  private context: PromptDto[] = [];

  private dictionary: PromptDtoDictionary = {};

  constructor(
    private readonly service: OpenAIApi,
    private readonly promptsService: PromptsService,
  ) {
    (async () => {
      const result = await this.promptsService.getPrompts();
      this.context = result.map(({ content, role }) => ({ content, role }));
    })();
  }

  async textCompletion(
    conversation: CompletionWithUserDto,
    modelId: string = this.TURBO_MODEL,
  ): Promise<OpenAiChatCompletionResponse> {
    if (!this.dictionary[conversation.userId]) {
      this.dictionary[conversation.userId] = [];
      this.dictionary[conversation.userId].push(...this.context);
    }

    this.dictionary[conversation.userId].push({
      role: conversation.role,
      content: conversation.content,
    });

    const result = this.service
      .createChatCompletion({
        messages: this.dictionary[conversation.userId] as ChatCompletionRequestMessage[],
        model: modelId,
        temperature: this.TEMPERATURE,
        user: conversation.userId.toString(),
      })
      .then((response) => {
        if (response.data.choices) {
          this.dictionary[conversation.userId].push({
            content: response.data.choices[0].message.content,
            role: response.data.choices[0].message.role,
          });
        }
        return response.data;
      }) as unknown as OpenAiChatCompletionResponse;

    return result;
  }
}
