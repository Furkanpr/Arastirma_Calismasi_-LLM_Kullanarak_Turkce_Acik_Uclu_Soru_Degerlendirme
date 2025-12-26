import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { LlmModule } from '../llm/llm.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [LlmModule, FirebaseModule],
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}


