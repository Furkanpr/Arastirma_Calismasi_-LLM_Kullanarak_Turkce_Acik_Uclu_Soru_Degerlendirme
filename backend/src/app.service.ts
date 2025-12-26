import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Exam Evaluation System API - Powered by LLaMA 3';
  }
}


