import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

    const titleMap = {
      '/': '昼朝レポート作成サポート',
      '/morning': '今日の目標設定',
      '/night': '今日の振り返り',
      '/history': '履歴・レポート'
    };

  const title = titleMap[location.pathname] || '昼朝レポート作成サポート';

  return (
    <header className="header">
      {!isHome && (
        <button onClick={() => navigate(-1)} className="header-back" aria-label="戻る">
          <ChevronLeft size={24} />
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}
