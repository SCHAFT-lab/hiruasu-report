import { Link } from 'react-router-dom';
import { Sun, Moon, AlertTriangle } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function Home() {
  const { getTodayLog } = useLogs();
  const todayLog = getTodayLog();

  const isMorningDone = todayLog && todayLog.morning;
  const isNightDone = todayLog && (todayLog.night || todayLog.nightAudio);

  const hour = new Date().getHours();
  const isMorningTime = hour < 12;

  return (
    <div className="content">
      {(!isMorningDone || !isNightDone) && (
        <div className="alert">
          <AlertTriangle className="alert-icon" />
          <div className="alert-content">
            <h3>未入力があります</h3>
            <p>
              {!isMorningDone && !isNightDone && "「今日の目標」と「振り返り」が未入力です。"}
              {!isMorningDone && isNightDone && "「今日の目標」が未入力です。"}
              {isMorningDone && !isNightDone && "「振り返り」が未入力です。"}
            </p>
          </div>
        </div>
      )}

      <Link to="/morning" className={`dashboard-btn morning ${!isMorningDone ? 'emphasized' : 'diminished'}`}>
        <Sun size={48} color={!isMorningDone ? "#FBC02D" : "#BDBDBD"} fill={!isMorningDone ? "#FFF9C4" : "#F5F5F5"} />
        <h2>今日の目標</h2>
        {isMorningDone && <span className="text-sm text-muted">入力済み</span>}
      </Link>

      <Link to="/night" className={`dashboard-btn night ${!isNightDone ? 'emphasized' : 'diminished'}`}>
        <Moon size={48} color={!isNightDone ? "#43A047" : "#BDBDBD"} fill={!isNightDone ? "#E8F5E9" : "#F5F5F5"} />
        <h2>振り返り</h2>
        {isNightDone && <span className="text-sm text-muted">入力済み</span>}
      </Link>
    </div>
  );
}
