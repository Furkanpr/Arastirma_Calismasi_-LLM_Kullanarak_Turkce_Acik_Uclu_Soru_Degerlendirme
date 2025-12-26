import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EvaluationService, EvaluationRequest, EvaluationResponse } from './evaluation.service';

@ApiTags('evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Yeni bir değerlendirme yap' })
  @ApiResponse({ status: 201, description: 'Değerlendirme başarıyla oluşturuldu' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: { type: 'string', example: 'İklim değişikliğinin nedenleri nelerdir?' },
        answer: { type: 'string', example: 'İklim değişikliği...' },
        studentId: { type: 'string', example: 'student123' },
        studentName: { type: 'string', example: 'Ahmet Yılmaz' },
        rubricId: { type: 'string', example: 'default' },
      },
      required: ['question', 'answer'],
    },
  })
  async evaluateAnswer(@Body() request: EvaluationRequest): Promise<EvaluationResponse> {
    return await this.evaluationService.evaluateAnswer(request);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm değerlendirmeleri getir' })
  @ApiResponse({ status: 200, description: 'Değerlendirmeler başarıyla getirildi' })
  async getAllEvaluations(): Promise<EvaluationResponse[]> {
    return await this.evaluationService.getAllEvaluations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir değerlendirmeyi getir' })
  @ApiResponse({ status: 200, description: 'Değerlendirme başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Değerlendirme bulunamadı' })
  async getEvaluation(@Param('id') id: string): Promise<EvaluationResponse | null> {
    return await this.evaluationService.getEvaluation(id);
  }

  @Put(':id/approve')
  @ApiOperation({ summary: 'Değerlendirmeyi onayla' })
  @ApiResponse({ status: 200, description: 'Değerlendirme başarıyla onaylandı' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        teacherScore: { type: 'number', example: 85 },
        teacherFeedback: { type: 'string', example: 'Çok iyi bir yanıt' },
      },
    },
  })
  async approveEvaluation(
    @Param('id') id: string,
    @Body() body: { teacherScore?: number; teacherFeedback?: string },
  ): Promise<EvaluationResponse | null> {
    return await this.evaluationService.approveEvaluation(
      id,
      body.teacherScore,
      body.teacherFeedback,
    );
  }

  @Put(':id/reject')
  @ApiOperation({ summary: 'Değerlendirmeyi reddet ve farklı puan ver' })
  @ApiResponse({ status: 200, description: 'Değerlendirme reddedildi ve güncellendi' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        teacherScore: { type: 'number', example: 75 },
        teacherFeedback: { type: 'string', example: 'Bazı eksikler var' },
      },
      required: ['teacherScore', 'teacherFeedback'],
    },
  })
  async rejectEvaluation(
    @Param('id') id: string,
    @Body() body: { teacherScore: number; teacherFeedback: string },
  ): Promise<EvaluationResponse | null> {
    return await this.evaluationService.rejectEvaluation(
      id,
      body.teacherScore,
      body.teacherFeedback,
    );
  }
}


