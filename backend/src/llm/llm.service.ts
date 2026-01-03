import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

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
  private groqClient: Groq | null = null;
  private useMockMode = false;
  private model: string = 'llama-3.3-70b-versatile';

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

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    this.model = this.configService.get<string>('GROQ_MODEL') || 'llama-3.3-70b-versatile';

    if (apiKey && apiKey !== 'your-groq-api-key-here') {
      try {
        this.groqClient = new Groq({
          apiKey: apiKey,
        });
        this.useMockMode = false;
        console.log('✅ Groq LLM initialized successfully');
      } catch (error) {
        console.error('❌ Groq initialization error:', error.message);
        console.log('⚠️  Using mock LLM for evaluation');
        this.useMockMode = true;
      }
    } else {
      console.log('⚠️  GROQ_API_KEY not found, using mock LLM for evaluation');
      this.useMockMode = true;
    }
  }

  /**
   * LLM ile değerlendirme yapar (Groq API veya mock)
   */
  async evaluateAnswer(
    question: string,
    answer: string,
    rubric?: RubricCriteria[],
  ): Promise<EvaluationResult> {
    const criteriaToUse = rubric || this.defaultRubric;

    if (this.useMockMode || !this.groqClient) {
      console.log('📝 Using mock evaluation');
      return this.generateMockEvaluation(question, answer, criteriaToUse);
    }

    try {
      return await this.evaluateWithLLM(question, answer, criteriaToUse);
    } catch (error) {
      console.error('❌ LLM evaluation error:', error.message);
      console.log('⚠️  Falling back to mock evaluation');
      return this.generateMockEvaluation(question, answer, criteriaToUse);
    }
  }

  /**
   * Gerçek LLM ile değerlendirme yapar
   */
  private async evaluateWithLLM(
    question: string,
    answer: string,
    rubric: RubricCriteria[],
  ): Promise<EvaluationResult> {
    const rubricText = rubric
      .map(
        (c, index) =>
          `${index + 1}. ${c.name} (Ağırlık: %${c.weight * 100}): ${c.description}`,
      )
      .join('\n');

    const prompt = `Sen bir eğitim uzmanısın. Aşağıdaki açık uçlu soruyu ve öğrenci yanıtını objektif bir şekilde değerlendir.

SORU:
${question}

ÖĞRENCİ YANITI:
${answer}

Aşağıdaki kriterlere göre değerlendirme yap:

${rubricText}

Lütfen yanıtı her kriter için 0-100 arası bir puan ver ve kısa, yapıcı geri bildirim sağla. Sonra genel bir değerlendirme yap.

MUTLAKA aşağıdaki JSON formatında cevap ver (başka hiçbir şey yazma, sadece JSON):

{
  "accuracy": {
    "score": 0-100 arası sayı,
    "feedback": "kısa geri bildirim metni"
  },
  "coverage": {
    "score": 0-100 arası sayı,
    "feedback": "kısa geri bildirim metni"
  },
  "clarity": {
    "score": 0-100 arası sayı,
    "feedback": "kısa geri bildirim metni"
  },
  "totalScore": 0-100 arası sayı (ağırlıklı ortalama),
  "overallFeedback": "genel değerlendirme metni"
}`;

    const completion = await this.groqClient!.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'Sen bir eğitim uzmanısın. Açık uçlu soruları objektif ve adil bir şekilde değerlendirirsin. Her zaman JSON formatında cevap verirsin.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: this.model,
      temperature: 0.3, // Daha tutarlı sonuçlar için düşük temperature
      max_tokens: 1000,
      response_format: { type: 'json_object' }, // JSON format zorla
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('LLM response is empty');
    }

    // JSON parse et
    let evaluationData;
    try {
      // Eğer response markdown code block içindeyse temizle
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      evaluationData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response text:', responseText);
      throw new Error('Failed to parse LLM response as JSON');
    }

    // Validation: Gerekli alanlar var mı kontrol et
    if (
      !evaluationData.accuracy ||
      !evaluationData.coverage ||
      !evaluationData.clarity ||
      typeof evaluationData.totalScore !== 'number'
    ) {
      throw new Error('Invalid LLM response structure');
    }

    // Score'ları 0-100 arasında sınırla
    evaluationData.accuracy.score = Math.max(0, Math.min(100, Math.round(evaluationData.accuracy.score)));
    evaluationData.coverage.score = Math.max(0, Math.min(100, Math.round(evaluationData.coverage.score)));
    evaluationData.clarity.score = Math.max(0, Math.min(100, Math.round(evaluationData.clarity.score)));
    evaluationData.totalScore = Math.max(0, Math.min(100, Math.round(evaluationData.totalScore)));

    return {
      criteria: {
        accuracy: {
          score: evaluationData.accuracy.score,
          feedback: evaluationData.accuracy.feedback || 'Değerlendirme yapıldı.',
        },
        coverage: {
          score: evaluationData.coverage.score,
          feedback: evaluationData.coverage.feedback || 'Değerlendirme yapıldı.',
        },
        clarity: {
          score: evaluationData.clarity.score,
          feedback: evaluationData.clarity.feedback || 'Değerlendirme yapıldı.',
        },
      },
      totalScore: evaluationData.totalScore,
      overallFeedback:
        evaluationData.overallFeedback ||
        'Yanıt değerlendirildi. Lütfen kriterlere göre detayları inceleyin.',
    };
  }

  /**
   * Mock değerlendirme (fallback için)
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
    const accuracyScore = Math.min(100, Math.floor((answerLength / 200) * 100));
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
