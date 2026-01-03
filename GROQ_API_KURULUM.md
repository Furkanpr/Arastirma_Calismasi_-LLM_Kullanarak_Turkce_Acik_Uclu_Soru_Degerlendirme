# Groq API Kurulum Rehberi

## 🚀 LLM Entegrasyonu Tamamlandı!

Sistem artık gerçek bir LLM (Llama 3.3 modeli) kullanarak değerlendirme yapabilir.

## 📋 Adımlar

### 1. Groq API Key Alma

1. [Groq Console](https://console.groq.com/) adresine gidin
2. Ücretsiz hesap oluşturun (e-posta ile kayıt)
3. Dashboard'dan **API Keys** sekmesine gidin
4. **Create API Key** butonuna tıklayın
5. Key'i kopyalayın (bir daha gösterilmeyecek!)

### 2. Backend .env Dosyası Oluşturma

`backend/.env` dosyası oluşturup şunu ekleyin:

```env
# LLM Configuration (Groq API)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Buraya kendi key'inizi yazın
GROQ_MODEL=llama-3.3-70b-versatile
```

**Not:** `.env` dosyası zaten `.gitignore`'da olduğu için Git'e yüklenmeyecek.

### 3. Backend'i Yeniden Başlatın

```bash
pnpm run dev
```

veya

```bash
npm run dev
```

### 4. Test Edin

1. Frontend'te `/evaluate` sayfasına gidin
2. Bir soru ve yanıt girin
3. "Değerlendir" butonuna tıklayın
4. LLM'in gerçek değerlendirmesini görün! 🎉

## ✅ Başarılı Kurulum Kontrolü

Backend console'da şunu görmelisiniz:

```
✅ Groq LLM initialized successfully
```

Eğer API key yoksa veya hatalıysa:

```
⚠️  GROQ_API_KEY not found, using mock LLM for evaluation
```

## 🔄 Mock Mode vs Real LLM

- **API Key Varsa**: Gerçek Llama 3.3 modeli kullanılır
- **API Key Yoksa**: Mock değerlendirme (basit heuristik) kullanılır
- **API Hatası Olursa**: Otomatik olarak mock mode'a geçer

## 📊 Groq API Özellikleri

- **Model**: Llama 3.3 70B (veya 3.1)
- **Hız**: ~300 tokens/saniye (çok hızlı!)
- **Ücretsiz Tier**: 
  - Rate limit: 30 requests/dakika
  - Günlük limit: 14,400 requests
  - Aylık limit: ~432,000 requests
- **Maliyet**: Tamamen ücretsiz!

## 🎯 Kullanılan Model

Varsayılan olarak `llama-3.3-70b-versatile` modeli kullanılıyor.

Alternatif modeller (`.env` dosyasında değiştirebilirsiniz):
- `llama-3.3-70b-versatile` (Önerilen - En yeni ve en iyi)
- `llama-3.1-70b-versatile`
- `llama-3.1-8b-instant` (Daha hızlı ama daha az güçlü)

## ⚠️ Önemli Notlar

1. **API Key Güvenliği**: API key'inizi asla public repository'lere yüklemeyin
2. **Rate Limits**: Ücretsiz tier'da dakikada 30 istek limiti var
3. **Response Time**: LLM çağrısı 2-5 saniye sürebilir (normal)
4. **Fallback**: API hatası olursa sistem otomatik mock mode'a geçer

## 🐛 Sorun Giderme

### "GROQ_API_KEY not found" hatası
- `.env` dosyasının `backend/` klasöründe olduğundan emin olun
- API key'in doğru kopyalandığından emin olun
- Backend'i yeniden başlatın

### "Failed to parse LLM response" hatası
- Model bazen JSON dışında yanıt verebilir, sistem otomatik mock mode'a geçer
- Bu normaldir, bir sonraki istekte çalışabilir

### Rate limit hatası
- Dakikada 30 istek limiti var
- Biraz bekleyip tekrar deneyin

## 📚 Daha Fazla Bilgi

- [Groq Documentation](https://console.groq.com/docs)
- [Groq API Reference](https://console.groq.com/docs/api-reference)




