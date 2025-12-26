import { Injectable } from '@nestjs/common';

export interface Rubric {
  id: string;
  name: string;
  description: string;
  criteria: RubricCriterion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RubricCriterion {
  name: string;
  weight: number;
  description: string;
  maxScore: number;
}

@Injectable()
export class RubricService {
  private rubrics: Rubric[] = [
    {
      id: 'default',
      name: 'Varsayılan Rubrik',
      description: 'Doğruluk, kapsam ve netlik kriterlerine göre değerlendirme',
      criteria: [
        {
          name: 'Doğruluk',
          weight: 0.4,
          description: 'Yanıtın soruya uygunluğu ve bilimsel doğruluğu',
          maxScore: 100,
        },
        {
          name: 'Kapsam',
          weight: 0.35,
          description: 'Konuyu kapsama düzeyi ve derinliği',
          maxScore: 100,
        },
        {
          name: 'Netlik',
          weight: 0.25,
          description: 'İfade açıklığı ve mantıksal tutarlılık',
          maxScore: 100,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getAllRubrics(): Rubric[] {
    return this.rubrics;
  }

  getRubricById(id: string): Rubric | null {
    return this.rubrics.find((r) => r.id === id) || null;
  }

  createRubric(rubric: Omit<Rubric, 'id' | 'createdAt' | 'updatedAt'>): Rubric {
    const newRubric: Rubric = {
      ...rubric,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.rubrics.push(newRubric);
    return newRubric;
  }

  updateRubric(id: string, rubric: Partial<Rubric>): Rubric | null {
    const index = this.rubrics.findIndex((r) => r.id === id);
    if (index === -1) return null;

    this.rubrics[index] = {
      ...this.rubrics[index],
      ...rubric,
      updatedAt: new Date(),
    };
    return this.rubrics[index];
  }

  deleteRubric(id: string): boolean {
    const index = this.rubrics.findIndex((r) => r.id === id);
    if (index === -1) return false;

    this.rubrics.splice(index, 1);
    return true;
  }

  private generateId(): string {
    return `rubric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}


