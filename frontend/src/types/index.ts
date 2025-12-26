export interface EvaluationCriteria {
  accuracy: { score: number; feedback: string };
  coverage: { score: number; feedback: string };
  clarity: { score: number; feedback: string };
}

export interface Evaluation {
  id: string;
  question: string;
  answer: string;
  studentId?: string;
  studentName?: string;
  criteria: EvaluationCriteria;
  totalScore: number;
  overallFeedback: string;
  teacherApproved: boolean;
  teacherScore?: number;
  teacherFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rubric {
  id: string;
  name: string;
  description: string;
  criteria: RubricCriterion[];
}

export interface RubricCriterion {
  name: string;
  weight: number;
  description: string;
  maxScore: number;
}


