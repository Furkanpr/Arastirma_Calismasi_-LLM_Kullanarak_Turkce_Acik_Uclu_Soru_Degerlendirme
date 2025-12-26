# Firebase Konfigürasyon

## Kurulum

1. Firebase Console'a gidin: https://console.firebase.google.com/
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. Project Settings > Service Accounts sekmesine gidin
4. "Generate new private key" butonuna tıklayın
5. İndirilen JSON dosyasını `serviceAccountKey.json` olarak bu klasöre kaydedin

## Güvenlik Uyarısı

⚠️ **serviceAccountKey.json dosyasını asla Git'e commit etmeyin!**

Bu dosya, Firebase projenize tam erişim sağlar ve kötüye kullanıldığında kritik güvenlik riski oluşturur.

## Not

Development ortamında bu dosya bulunmazsa sistem fallback olarak mock veri kullanacaktır.


