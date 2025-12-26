import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluationService } from '../services/api';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';

function EvaluationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    studentName: '',
    studentId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Lütfen soru ve yanıtı girin');
      return;
    }

    setLoading(true);
    try {
      const result = await evaluationService.evaluateAnswer({
        question: formData.question,
        answer: formData.answer,
        studentName: formData.studentName || undefined,
        studentId: formData.studentId || undefined,
      });
      
      toast.success('Değerlendirme başarıyla tamamlandı!');
      navigate('/results', { state: { evaluation: result } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Değerlendirme sırasında bir hata oluştu');
      console.error('Evaluation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Yeni Değerlendirme">
      <div className="grid-2">
        <div>
          <div className="card">
            <h2>Değerlendirme Formu</h2>
            <p className="text-secondary text-sm mb-4">
              Soruyu ve öğrenci yanıtını girin. Sistem otomatik olarak rubrik kriterlerine göre değerlendirme yapacaktır.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Öğrenci Adı</label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>

                <div className="form-group">
                  <label>Öğrenci ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="Örn: 12345"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Soru *</label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Açık uçlu soruyu buraya girin..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Öğrenci Yanıtı *</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Öğrencinin verdiği yanıtı buraya girin..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                  disabled={loading}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                      Değerlendiriliyor...
                    </span>
                  ) : (
                    'Değerlendir'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="card">
            <h2>Rubrik Kriterleri</h2>
            <p className="text-secondary text-sm mb-4">
              Değerlendirme aşağıdaki kriterlere göre yapılacaktır.
            </p>
            
            <div className="criteria-card">
              <h4>Doğruluk</h4>
              <p className="weight">Ağırlık: %40</p>
              <p className="feedback">
                Yanıtın soruya uygunluğu ve bilimsel doğruluğu değerlendirilir.
              </p>
            </div>
            
            <div className="criteria-card">
              <h4>Kapsam</h4>
              <p className="weight">Ağırlık: %35</p>
              <p className="feedback">
                Konuyu kapsama düzeyi ve derinliği analiz edilir.
              </p>
            </div>
            
            <div className="criteria-card">
              <h4>Netlik</h4>
              <p className="weight">Ağırlık: %25</p>
              <p className="feedback">
                İfade açıklığı ve mantıksal tutarlılık değerlendirilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EvaluationPage;
