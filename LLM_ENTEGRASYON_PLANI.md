# LLM Entegrasyon Planı

## 🎯 Yapılacaklar

### 1. **LLM Sağlayıcı Seçimi**
   - **Önerilen: Groq API** (Ücretsiz tier, hızlı, Llama 3 modeli)
   - Alternatifler: OpenAI, Hugging Face, Local Model

### 2. **Kurulum Adımları**

#### A. Backend Paketleri Ekleme
   - `@nestjs/config` - Environment variable yönetimi
   - `groq-sdk` - Groq API client (veya `openai` OpenAI için)

#### B. Environment Variables
   - `.env` dosyasına `GROQ_API_KEY` ekleme
   - API key'i [Groq Console](https://console.groq.com/)'dan alınır

#### C. LLM Servisi Güncelleme
   - `llm.service.ts` dosyasını güncelleme
   - Gerçek API çağrıları ekleme
   - Prompt engineering (rubrik tabanlı JSON çıktı)

### 3. **Prompt Tasarımı**
   - Rubrik kriterlerine göre değerlendirme
   - JSON format çıktı (structured output)
   - Türkçe geri bildirim üretimi

### 4. **Hata Yönetimi**
   - API hatalarında mock mode'a fallback
   - Retry mekanizması

## 📝 Teknik Detaylar

### Groq API Özellikleri
- Model: `llama-3.1-70b-versatile` veya `llama-3.3-70b-versatile`
- Hız: ~300 tokens/saniye
- Ücretsiz Tier: Günde 30 request (14,400 requests/day)
- JSON Mode desteği var

### Prompt Yapısı
```typescript
const prompt = `
Sen bir eğitim uzmanısın. Aşağıdaki açık uçlu soruyu ve öğrenci yanıtını değerlendir.

SORU: ${question}
ÖĞRENCİ YANITI: ${answer}

Aşağıdaki kriterlere göre değerlendirme yap:
1. Doğruluk (Ağırlık: %40): Yanıtın soruya uygunluğu ve bilimsel doğruluğu
2. Kapsam (Ağırlık: %35): Konuyu kapsama düzeyi ve derinliği
3. Netlik (Ağırlık: %25): İfade açıklığı ve mantıksal tutarlılık

JSON formatında cevap ver:
{
  "accuracy": { "score": 0-100, "feedback": "açıklama" },
  "coverage": { "score": 0-100, "feedback": "açıklama" },
  "clarity": { "score": 0-100, "feedback": "açıklama" },
  "totalScore": 0-100,
  "overallFeedback": "genel değerlendirme"
}
`;
```

## ⚠️ Dikkat Edilmesi Gerekenler

1. **API Rate Limits**: Groq'un rate limit'lerine dikkat
2. **Maliyet**: Groq ücretsiz tier var ama kontrol edin
3. **Response Time**: LLM çağrısı 2-5 saniye sürebilir
4. **Error Handling**: API hatalarında fallback mekanizması
5. **Token Limit**: Prompt + response token limit'lerini kontrol edin

## 🔄 Mock Mode vs Real LLM

- API key yoksa → Mock mode
- API key varsa → Gerçek LLM kullan
- API hatası olursa → Mock mode'a fallback





