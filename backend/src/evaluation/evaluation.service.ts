import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';
import { FirebaseService } from '../firebase/firebase.service';

export interface EvaluationRequest {
  question: string;
  answer: string;
  studentId?: string;
  studentName?: string;
  rubricId?: string;
}

export interface EvaluationResponse {
  id: string;
  question: string;
  answer: string;
  studentId?: string;
  studentName?: string;
  criteria: {
    accuracy: { score: number; feedback: string };
    coverage: { score: number; feedback: string };
    clarity: { score: number; feedback: string };
  };
  totalScore: number;
  overallFeedback: string;
  teacherApproved: boolean;
  teacherScore?: number;
  teacherFeedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class EvaluationService {
  constructor(
    private readonly llmService: LlmService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async evaluateAnswer(request: EvaluationRequest): Promise<EvaluationResponse> {
    try {
      // LLM ile değerlendirme yap
      const evaluationResult = await this.llmService.evaluateAnswer(
        request.question,
        request.answer,
      );

      // Sonuçları Firebase'e kaydet
      const evaluationData = {
        question: request.question,
        answer: request.answer,
        studentId: request.studentId,
        studentName: request.studentName,
        rubricId: request.rubricId || 'default',
        criteria: evaluationResult.criteria,
        totalScore: evaluationResult.totalScore,
        overallFeedback: evaluationResult.overallFeedback,
        teacherApproved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const evaluationId = await this.firebaseService.saveEvaluation(evaluationData);

      return {
        id: evaluationId,
        ...evaluationData,
      };
    } catch (error) {
      console.error('Error evaluating answer:', error);
      throw error;
    }
  }

  async getEvaluation(evaluationId: string): Promise<EvaluationResponse | null> {
    try {
      const evaluation = await this.firebaseService.getEvaluation(evaluationId);
      return evaluation as EvaluationResponse;
    } catch (error) {
      console.error('Error getting evaluation:', error);
      throw error;
    }
  }

  async getAllEvaluations(): Promise<EvaluationResponse[]> {
    try {
      const evaluations = await this.firebaseService.getAllEvaluations();
      return evaluations as EvaluationResponse[];
    } catch (error) {
      console.error('Error getting all evaluations:', error);
      throw error;
    }
  }

  async approveEvaluation(
    evaluationId: string,
    teacherScore?: number,
    teacherFeedback?: string,
  ): Promise<EvaluationResponse | null> {
    try {
      const updateData: any = {
        teacherApproved: true,
        updatedAt: new Date(),
      };

      if (teacherScore !== undefined) {
        updateData.teacherScore = teacherScore;
      }

      if (teacherFeedback) {
        updateData.teacherFeedback = teacherFeedback;
      }

      await this.firebaseService.updateEvaluation(evaluationId, updateData);
      return await this.getEvaluation(evaluationId);
    } catch (error) {
      console.error('Error approving evaluation:', error);
      throw error;
    }
  }

  async rejectEvaluation(
    evaluationId: string,
    teacherScore: number,
    teacherFeedback: string,
  ): Promise<EvaluationResponse | null> {
    try {
      const updateData = {
        teacherApproved: false,
        teacherScore,
        teacherFeedback,
        updatedAt: new Date(),
      };

      await this.firebaseService.updateEvaluation(evaluationId, updateData);
      return await this.getEvaluation(evaluationId);
    } catch (error) {
      console.error('Error rejecting evaluation:', error);
      throw error;
    }
  }
}


