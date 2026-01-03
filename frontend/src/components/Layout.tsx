import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

function Layout({ children, title }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/evaluate', label: 'Değerlendir' },
    { path: '/results', label: 'Sonuçlar' },
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14v7" />
              </svg>
            </div>
            <div className="brand-text">
              <h1>Sınav Değerlendirme Sistemi</h1>
              <span className="brand-subtitle">LLM Tabanlı Otomatik Puanlama</span>
            </div>
          </div>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {title && (
            <div className="page-header">
              <h2 className="page-title">{title}</h2>
            </div>
          )}
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Sınav Değerlendirme Sistemi - Bilgisayar Araştırma Bitirme Projesi</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;





