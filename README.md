# Büyük Dil Modeli (LLM) Kullanarak Açık Uçlu Sınav Sorularını Otomatik Değerlendirme Sistemi

## 📋 Proje Özeti

Bu proje, öğretmenlerin açık uçlu sınav sorularını manuel olarak değerlendirmesi sırasında ortaya çıkan zaman kaybını ve subjektiflik problemini ortadan kaldırmak amacıyla geliştirilmiş yapay zekâ destekli objektif bir puanlama sistemidir.

## 🎯 Temel Özellikler

- ✅ **Otomatik Puanlama**: LLaMA 3 Türkçe modeli ile rubrik tabanlı değerlendirme
- 🇹🇷 **Türkçe Dil Desteği**: Tam Türkçe metin analizi ve geri bildirim
- 📊 **Rubrik Kriterleri**: Doğruluk, kapsam ve netlik bazlı puanlama
- 🔒 **Veri Gizliliği**: Çevrimdışı çalışma desteği
- 💬 **Otomatik Geri Bildirim**: Öğrencilere detaylı açıklamalı geri bildirim
- 👨‍🏫 **Öğretmen Onayı**: Öğretmenler puanları onaylayabilir veya değiştirebilir

## 🛠️ Teknoloji Stack

- **Backend**: Node.js (NestJS)
- **Frontend**: React
- **Veritabanı**: Firebase
- **AI Model**: LLaMA 3 Türkçe

## 📁 Proje Yapısı

```
├── backend/          # NestJS backend uygulaması
├── frontend/         # React frontend uygulaması
├── firebase-config/  # Firebase konfigürasyon dosyaları
└── README.md
```

## 🚀 Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Firebase hesabı (opsiyonel - geliştirme için gerekli değil)
- Git

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repo-url>
cd "bilgisayar Arastırma bitirme projesi"
```

2. **Root dizinde bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Backend bağımlılıklarını yükleyin:**
```bash
cd backend
npm install
cd ..
```

4. **Frontend bağımlılıklarını yükleyin:**
```bash
cd frontend
npm install
cd ..
```

5. **Firebase konfigürasyonunu ayarlayın (Opsiyonel):**
   - Firebase Console'a gidin: https://console.firebase.google.com/
   - Yeni bir proje oluşturun
   - Project Settings > Service Accounts sekmesine gidin
   - "Generate new private key" butonuna tıklayın
   - İndirilen JSON dosyasını `firebase-config/serviceAccountKey.json` olarak kaydedin
   - Not: Firebase olmadan da çalışır (mock mode)

6. **Backend'i başlatın:**
```bash
npm run backend:dev
```
Backend http://localhost:3001 adresinde çalışacak ve Swagger dokümantasyonu http://localhost:3001/api adresinde erişilebilir olacaktır.

7. **Frontend'i başlatın (yeni bir terminal):**
```bash
npm run frontend:dev
```
Frontend http://localhost:3000 adresinde çalışacaktır.

## 📝 Kullanım

1. Öğretmen veya öğrenci sistem arayüzüne giriş yapar
2. Açık uçlu soru ve öğrenci yanıtı sisteme yüklenir
3. Sistem, yanıtı rubrik kriterlerine göre otomatik olarak değerlendirir
4. Model, her kriter için puan ve açıklayıcı geri bildirim üretir
5. Sonuçlar Firebase'e kaydedilir ve web arayüzünde gösterilir
6. Öğretmen puanı onaylar veya değiştirir

## 🔍 Rubrik Kriterleri

- **Doğruluk**: Yanıtın soruya uygunluğu ve doğruluğu
- **Kapsam**: Konuyu kapsama düzeyi ve derinliği
- **Netlik**: İfade açıklığı ve mantıksal tutarlılık

## 🌟 Özgün Yönler

- Türkçe dilinde rubrik tabanlı çalışan ilk LLM tabanlı değerlendirme sistemi
- Çevrimdışı kullanım desteği ile veri gizliliği korunur
- Öğrencilere sadece puan değil, otomatik açıklamalı geri bildirim sağlar
- Açık kaynaklı teknolojilerle geliştirilmiştir

## 🔌 API Endpoints

### Evaluation Endpoints

- `POST /evaluation` - Yeni bir değerlendirme yap
- `GET /evaluation` - Tüm değerlendirmeleri getir
- `GET /evaluation/:id` - Belirli bir değerlendirmeyi getir
- `PUT /evaluation/:id/approve` - Değerlendirmeyi onayla
- `PUT /evaluation/:id/reject` - Değerlendirmeyi reddet ve farklı puan ver

### Rubric Endpoints

- `GET /rubrics` - Tüm rubrikleri getir
- `GET /rubrics/:id` - Belirli bir rubriği getir
- `POST /rubrics` - Yeni rubrik oluştur
- `PUT /rubrics/:id` - Rubrik güncelle
- `DELETE /rubrics/:id` - Rubrik sil

### Health Check

- `GET /` - API durumu
- `GET /health` - Sistem sağlık kontrolü

## 📊 Veri Yapısı

### Evaluation Request
```json
{
  "question": "İklim değişikliğinin nedenleri nelerdir?",
  "answer": "İklim değişikliği...",
  "studentId": "12345",
  "studentName": "Ahmet Yılmaz",
  "rubricId": "default"
}
```

### Evaluation Response
```json
{
  "id": "eval_123",
  "question": "...",
  "answer": "...",
  "criteria": {
    "accuracy": { "score": 85, "feedback": "..." },
    "coverage": { "score": 80, "feedback": "..." },
    "clarity": { "score": 75, "feedback": "..." }
  },
  "totalScore": 80,
  "overallFeedback": "...",
  "teacherApproved": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 🧪 Geliştirme Notları

### LLaMA 3 Entegrasyonu

Şu anda sistem mock evaluation kullanmaktadır. Gerçek LLaMA 3 Türkçe modeli entegrasyonu için:

1. LLaMA 3 Türkçe modelini indirin veya API erişimi sağlayın
2. `backend/src/llm/llm.service.ts` dosyasındaki `evaluateAnswer` metodunu güncelleyin
3. Python bridge veya REST API kullanarak model ile iletişim kurun

### Firebase Mock Mode

Firebase credentials olmadan sistem mock mode'da çalışır ve veriler bellekte tutulur. Production için mutlaka Firebase ayarlarını yapın.

## 📄 Lisans

MIT

## 👥 Katkıda Bulunanlar

Bu proje Bilgisayar Araştırma Bitirme Projesi kapsamında geliştirilmiştir.

