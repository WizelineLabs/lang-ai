import { type ReadStream } from "fs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OpenAIApi, type CreateTranscriptionResponse } from "openai";

declare module "openai" {
  interface OpenAIApi {
    createTranscription(
      file: File | ReadStream,
      model: string,
      prompt?: string,
      responseFormat?: string,
      temperature?: number,
      language?: string,
      options?: AxiosRequestConfig
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports, @typescript-eslint/no-explicit-any
    ): Promise<import("axios").AxiosResponse<CreateTranscriptionResponse, any>>;
  }
}
