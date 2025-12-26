import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
  createdAt: string;
  updatedAt: string;
}

export const evaluationService = {
  async evaluateAnswer(request: EvaluationRequest): Promise<EvaluationResponse> {
    const response = await api.post('/evaluation', request);
    return response.data;
  },

  async getEvaluation(id: string): Promise<EvaluationResponse> {
    const response = await api.get(`/evaluation/${id}`);
    return response.data;
  },

  async getAllEvaluations(): Promise<EvaluationResponse[]> {
    const response = await api.get('/evaluation');
    return response.data;
  },

  async approveEvaluation(
    id: string,
    teacherScore?: number,
    teacherFeedback?: string,
  ): Promise<EvaluationResponse> {
    const response = await api.put(`/evaluation/${id}/approve`, {
      teacherScore,
      teacherFeedback,
    });
    return response.data;
  },

  async rejectEvaluation(
    id: string,
    teacherScore: number,
    teacherFeedback: string,
  ): Promise<EvaluationResponse> {
    const response = await api.put(`/evaluation/${id}/reject`, {
      teacherScore,
      teacherFeedback,
    });
    return response.data;
  },
};

export default api;


