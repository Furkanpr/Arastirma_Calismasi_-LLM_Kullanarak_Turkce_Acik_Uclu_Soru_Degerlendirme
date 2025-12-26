import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">LLM Destekli</div>
          <h1 className="hero-title">Akıllı Sınav Değerlendirme Sistemi</h1>
          <p className="hero-description">
            LLaMA 3 Türkçe modeli kullanarak açık uçlu sınav sorularını otomatik olarak 
            değerlendirir ve rubrik tabanlı objektif puanlama yapar.
          </p>
          <div className="hero-actions">
            <Link to="/evaluate" className="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Değerlendirme Başlat
            </Link>
            <Link to="/results" className="btn btn-secondary btn-lg">
              Sonuçları Görüntüle
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="hero-card-content">
              <div className="code-line">
                <span className="code-label">Soru:</span>
                <span className="code-text">İklim değişikliğinin etkileri...</span>
              </div>
              <div className="code-line">
                <span className="code-label">Analiz:</span>
                <span className="code-progress"></span>
              </div>
              <div className="code-result">
                <span className="result-score">85</span>
                <span className="result-label">Puan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">~3 sn</div>
            <div className="stat-label">Değerlendirme Süresi</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">%100</div>
            <div className="stat-label">Veri Gizliliği</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">3 Kriter</div>
            <div className="stat-label">Rubrik Değerlendirme</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">Hibrit</div>
            <div className="stat-label">AI + Öğretmen Onayı</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="card">
        <h2>Özellikler</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <h3>Otomatik Puanlama</h3>
            <p>LLaMA 3 Türkçe modeli ile rubrik tabanlı otomatik değerlendirme yapılır.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <h3>Rubrik Kriterleri</h3>
            <p>Doğruluk, kapsam ve netlik kriterlerine göre detaylı puanlama.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <h3>Geri Bildirim</h3>
            <p>Öğrencilere her kriter için açıklamalı geri bildirim sağlanır.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <path d="M22 4L12 14.01l-3-3"/>
              </svg>
            </div>
            <h3>Öğretmen Onayı</h3>
            <p>Öğretmenler puanları onaylayabilir veya değiştirebilir.</p>
          </div>
        </div>
      </div>

      {/* Steps Section - Timeline Style */}
      <div className="card">
        <h2>Nasıl Çalışır?</h2>
        <p className="text-secondary mb-4">Değerlendirme sürecini 5 kolay adımda tamamlayın</p>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <h4>Soru ve Yanıt Girişi</h4>
              <p>Açık uçlu soruyu ve öğrencinin verdiği yanıtı sisteme girin.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <h4>Otomatik Analiz</h4>
              <p>Sistem, yanıtı rubrik kriterlerine göre yapay zeka ile analiz eder.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <h4>Puan ve Geri Bildirim</h4>
              <p>Her kriter için detaylı puan ve açıklayıcı geri bildirim üretilir.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <path d="M20 8v6M23 11h-6"/>
                </svg>
              </div>
              <div className="timeline-line"></div>
            </div>
            <div className="timeline-content">
              <h4>Öğretmen İncelemesi</h4>
              <p>Öğretmen sonuçları inceler, onaylar veya gerekirse düzeltir.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                  <path d="M17 21v-8H7v8M7 3v5h8"/>
                </svg>
              </div>
            </div>
            <div className="timeline-content">
              <h4>Kayıt ve Takip</h4>
              <p>Tüm sonuçlar Firebase'e kaydedilir ve kolayca takip edilebilir.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h3>Değerlendirmeye Başlamaya Hazır mısınız?</h3>
          <p>Hemen bir değerlendirme yapın ve sistemin gücünü keşfedin.</p>
        </div>
        <Link to="/evaluate" className="btn btn-primary btn-lg">
          Şimdi Başla
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </Layout>
  );
}

export default HomePage;
