import { Link, useLocation } from 'react-router-dom';
import { Home, History, HelpCircle } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span>ホーム</span>
      </Link>
      <Link to="/history" className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}>
        <History size={24} />
        <span>履歴</span>
      </Link>
      <Link to="/manual" className={`nav-item ${location.pathname === '/manual' ? 'active' : ''}`}>
        <HelpCircle size={24} />
        <span>使いかた</span>
      </Link>
    </nav>
  );
}
