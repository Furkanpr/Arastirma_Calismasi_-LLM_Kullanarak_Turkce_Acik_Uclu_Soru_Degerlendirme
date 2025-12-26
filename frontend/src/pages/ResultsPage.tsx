import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { evaluationService, EvaluationResponse } from '../services/api';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';

function ResultsPage() {
  const location = useLocation();
  const [evaluation, setEvaluation] = useState<EvaluationResponse | null>(
    location.state?.evaluation || null
  );
  const [allEvaluations, setAllEvaluations] = useState<EvaluationResponse[]>([]);
  const [teacherScore, setTeacherScore] = useState('');
  const [teacherFeedback, setTeacherFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(true);

  useEffect(() => {
    loadAllEvaluations();
  }, []);

  const loadAllEvaluations = async () => {
    try {
      const evaluations = await evaluationService.getAllEvaluations();
      setAllEvaluations(evaluations);
    } catch (error) {
      console.error('Error loading evaluations:', error);
    } finally {
      setLoadingAll(false);
    }
  };

  const handleApprove = async () => {
    if (!evaluation) return;

    setLoading(true);
    try {
      const updated = await evaluationService.approveEvaluation(
        evaluation.id,
        teacherScore ? parseFloat(teacherScore) : undefined,
        teacherFeedback || undefined
      );
      setEvaluation(updated);
      toast.success('Değerlendirme onaylandı!');
      setTeacherScore('');
      setTeacherFeedback('');
      loadAllEvaluations();
    } catch (error) {
      toast.error('Onaylama sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!evaluation || !teacherScore || !teacherFeedback) {
      toast.error('Lütfen puan ve geri bildirim girin');
      return;
    }

    setLoading(true);
    try {
      const updated = await evaluationService.rejectEvaluation(
        evaluation.id,
        parseFloat(teacherScore),
        teacherFeedback
      );
      setEvaluation(updated);
      toast.success('Değerlendirme güncellendi!');
      setTeacherScore('');
      setTeacherFeedback('');
      loadAllEvaluations();
    } catch (error) {
      toast.error('Güncelleme sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvaluation = async (id: string) => {
    try {
      const evalData = await evaluationService.getEvaluation(id);
      setEvaluation(evalData);
    } catch (error) {
      toast.error('Değerlendirme yüklenirken hata oluştu');
    }
  };

  // Boş durum
  if (!evaluation && allEvaluations.length === 0 && !loadingAll) {
    return (
      <Layout title="Sonuçlar">
        <div className="card">
          <div className="empty-state">
            <p>Henüz değerlendirme yapılmamış.</p>
            <Link to="/evaluate" className="btn btn-primary">
              Yeni Değerlendirme Başlat
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Değerlendirme Sonuçları">
      <div className="grid-main-sidebar">
        {/* Ana İçerik */}
        <div>
          {evaluation ? (
            <>
              {/* Puan Gösterimi */}
              <div className="score-display">
                <h3>{evaluation.totalScore}</h3>
                <p>Toplam Puan</p>
                {evaluation.teacherApproved && (
                  <span className="approved-badge">✓ Öğretmen Onaylı</span>
                )}
              </div>

              {/* Soru */}
              <div className="card">
                <h2>Soru</h2>
                <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                  {evaluation.question}
                </p>
              </div>

              {/* Öğrenci Yanıtı */}
              <div className="card">
                <h2>Öğrenci Yanıtı</h2>
                <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                  {evaluation.answer}
                </p>
              </div>

              {/* Kriterler */}
              <div className="card">
                <h2>Kriterlere Göre Değerlendirme</h2>
                
                <div className="criteria-card">
                  <h4>Doğruluk</h4>
                  <div className="score">{evaluation.criteria.accuracy.score} / 100</div>
                  <div className="feedback">{evaluation.criteria.accuracy.feedback}</div>
                </div>
                
                <div className="criteria-card">
                  <h4>Kapsam</h4>
                  <div className="score">{evaluation.criteria.coverage.score} / 100</div>
                  <div className="feedback">{evaluation.criteria.coverage.feedback}</div>
                </div>
                
                <div className="criteria-card">
                  <h4>Netlik</h4>
                  <div className="score">{evaluation.criteria.clarity.score} / 100</div>
                  <div className="feedback">{evaluation.criteria.clarity.feedback}</div>
                </div>
              </div>

              {/* Genel Geri Bildirim */}
              <div className="card">
                <h2>Genel Geri Bildirim</h2>
                <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                  {evaluation.overallFeedback}
                </p>
              </div>

              {/* Öğretmen Değerlendirmesi */}
              {evaluation.teacherScore && (
                <div className="card">
                  <h2>Öğretmen Değerlendirmesi</h2>
                  <p className="text-secondary mb-2">
                    <strong>Puan:</strong> {evaluation.teacherScore}
                  </p>
                  {evaluation.teacherFeedback && (
                    <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                      <strong>Geri Bildirim:</strong> {evaluation.teacherFeedback}
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="card">
              <div className="empty-state">
                <p>Detayları görüntülemek için sağ taraftaki listeden bir değerlendirme seçin.</p>
              </div>
            </div>
          )}
        </div>

        {/* Yan Panel */}
        <div>
          {/* Öğretmen Onayı */}
          {evaluation && (
            <div className="card">
              <h2>Öğretmen Onayı</h2>
              
              <div className="form-group">
                <label>Öğretmen Puanı</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={teacherScore}
                  onChange={(e) => setTeacherScore(e.target.value)}
                  placeholder="Örn: 85"
                />
              </div>
              
              <div className="form-group">
                <label>Öğretmen Geri Bildirimi</label>
                <textarea
                  value={teacherFeedback}
                  onChange={(e) => setTeacherFeedback(e.target.value)}
                  placeholder="Geri bildiriminizi yazın..."
                  rows={3}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-success"
                  onClick={handleApprove}
                  disabled={loading}
                >
                  Onayla
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleReject}
                  disabled={loading || !teacherScore || !teacherFeedback}
                >
                  Reddet ve Düzelt
                </button>
              </div>
            </div>
          )}

          {/* Değerlendirme Listesi */}
          <div className="card">
            <h2>Tüm Değerlendirmeler</h2>
            
            {loadingAll ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : allEvaluations.length === 0 ? (
              <p className="text-muted text-sm text-center">Henüz değerlendirme yok.</p>
            ) : (
              <div className="evaluation-list">
                {allEvaluations.map((item) => (
                  <div
                    key={item.id}
                    className={`evaluation-item ${item.id === evaluation?.id ? 'active' : ''}`}
                    onClick={() => handleSelectEvaluation(item.id)}
                  >
                    <div className="student-name">
                      {item.studentName || 'İsimsiz Öğrenci'}
                    </div>
                    <div className="score">
                      Puan: {item.totalScore} / 100
                    </div>
                    <div className="date">
                      {new Date(item.createdAt).toLocaleString('tr-TR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ResultsPage;
