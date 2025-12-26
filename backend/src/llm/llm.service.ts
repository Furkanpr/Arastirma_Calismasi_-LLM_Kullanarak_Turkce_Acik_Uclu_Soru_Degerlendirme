import { Injectable } from '@nestjs/common';

export interface RubricCriteria {
  name: string;
  weight: number;
  description: string;
}

export interface EvaluationResult {
  criteria: {
    accuracy: { score: number; feedback: string };
    coverage: { score: number; feedback: string };
    clarity: { score: number; feedback: string };
  };
  totalScore: number;
  overallFeedback: string;
}

@Injectable()
export class LlmService {
  private defaultRubric: RubricCriteria[] = [
    {
      name: 'Doğruluk',
      weight: 0.4,
      description: 'Yanıtın soruya uygunluğu ve bilimsel doğruluğu',
    },
    {
      name: 'Kapsam',
      weight: 0.35,
      description: 'Konuyu kapsama düzeyi ve derinliği',
    },
    {
      name: 'Netlik',
      weight: 0.25,
      description: 'İfade açıklığı ve mantıksal tutarlılık',
    },
  ];

  /**
   * LLaMA 3 Türkçe modeli ile değerlendirme yapar
   * Not: Gerçek implementasyonda LLaMA 3 API'si veya local model kullanılacak
   */
  async evaluateAnswer(
    question: string,
    answer: string,
    rubric?: RubricCriteria[],
  ): Promise<EvaluationResult> {
    // TODO: Gerçek LLaMA 3 Türkçe model entegrasyonu yapılacak
    // Şimdilik mock evaluation döndürüyoruz

    const criteriaToUse = rubric || this.defaultRubric;

    // Mock değerlendirme (gerçek implementasyonda LLaMA 3 kullanılacak)
    const mockEvaluation = this.generateMockEvaluation(
      question,
      answer,
      criteriaToUse,
    );

    return mockEvaluation;
  }

  /**
   * Geliştirme için mock değerlendirme üretir
   * Gerçek projede bu fonksiyon LLaMA 3 ile değiştirilecek
   */
  private generateMockEvaluation(
    question: string,
    answer: string,
    rubric: RubricCriteria[],
  ): EvaluationResult {
    // Basit heuristik tabanlı değerlendirme
    const answerLength = answer.trim().length;
    const wordCount = answer.split(/\s+/).length;

    // Doğruluk skoru (yanıt uzunluğuna göre basit bir hesaplama)
    const accuracyScore = Math.min(
      100,
      Math.floor((answerLength / 200) * 100),
    );
    const accuracyFeedback = this.generateFeedback('doğruluk', accuracyScore);

    // Kapsam skoru (kelime sayısına göre)
    const coverageScore = Math.min(100, Math.floor((wordCount / 100) * 100));
    const coverageFeedback = this.generateFeedback('kapsam', coverageScore);

    // Netlik skoru (ortalama)
    const clarityScore = Math.floor((accuracyScore + coverageScore) / 2);
    const clarityFeedback = this.generateFeedback('netlik', clarityScore);

    // Toplam skor (ağırlıklı ortalama)
    const totalScore = Math.floor(
      accuracyScore * 0.4 + coverageScore * 0.35 + clarityScore * 0.25,
    );

    return {
      criteria: {
        accuracy: { score: accuracyScore, feedback: accuracyFeedback },
        coverage: { score: coverageScore, feedback: coverageFeedback },
        clarity: { score: clarityScore, feedback: clarityFeedback },
      },
      totalScore,
      overallFeedback: this.generateOverallFeedback(totalScore),
    };
  }

  private generateFeedback(criteria: string, score: number): string {
    if (score >= 80) {
      return `${criteria.charAt(0).toUpperCase() + criteria.slice(1)} açısından çok iyi bir yanıt. Detaylı ve kapsamlı.`;
    } else if (score >= 60) {
      return `${criteria.charAt(0).toUpperCase() + criteria.slice(1)} açısından yeterli bir yanıt. Bazı iyileştirmeler yapılabilir.`;
    } else if (score >= 40) {
      return `${criteria.charAt(0).toUpperCase() + criteria.slice(1)} açısından orta düzeyde bir yanıt. Daha fazla detay eklenebilir.`;
    } else {
      return `${criteria.charAt(0).toUpperCase() + criteria.slice(1)} açısından yetersiz bir yanıt. Daha fazla çalışma gerekiyor.`;
    }
  }

  private generateOverallFeedback(totalScore: number): string {
    if (totalScore >= 80) {
      return 'Genel olarak çok başarılı bir yanıt. Sorulara kapsamlı ve doğru şekilde cevap verilmiş.';
    } else if (totalScore >= 60) {
      return 'Yeterli düzeyde bir yanıt. Bazı konularda daha fazla detay ve açıklama eklenebilir.';
    } else if (totalScore >= 40) {
      return 'Orta düzeyde bir yanıt. Konuları daha iyi kavramak ve daha detaylı açıklamalar yapmak gerekiyor.';
    } else {
      return 'Yetersiz bir yanıt. Konuları tekrar gözden geçirmeli ve daha fazla çalışma yapmalısınız.';
    }
  }

  /**
   * Rubric kriterlerini alır
   */
  getDefaultRubric(): RubricCriteria[] {
    return this.defaultRubric;
  }
}


