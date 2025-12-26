import { Module } from '@nestjs/common';
import { RubricService } from './rubric.service';
import { RubricController } from './rubric.controller';

@Module({
  controllers: [RubricController],
  providers: [RubricService],
  exports: [RubricService],
})
export class RubricModule {}


