import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvaluationModule } from './evaluation/evaluation.module';
import { FirebaseModule } from './firebase/firebase.module';
import { LlmModule } from './llm/llm.module';
import { RubricModule } from './rubric/rubric.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirebaseModule,
    LlmModule,
    RubricModule,
    EvaluationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


