import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function MorningForm() {
  const [content, setContent] = useState('');
  const { saveLog, getTodayLog } = useLogs();
  const navigate = useNavigate();

  useEffect(() => {
    const todayLog = getTodayLog();
    if (todayLog && todayLog.morning) {
      setContent(todayLog.morning);
    }
  }, []);

  const handleSave = () => {
    saveLog({ type: 'morning', content });
    navigate('/');
  };

  return (
    <div className="content">
      <div className="form-group">
        <label className="form-label" htmlFor="morning-goal">
          今日の目標
        </label>
        <p className="text-sm text-muted mb-4">
          今日の実習で意識する目標を入力してください。
        </p>
        <textarea
          id="morning-goal"
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="例：大道具の仕込みで、怪我なく安全第一で作業する。"
        />
      </div>
      
      <button className="btn btn-primary" onClick={handleSave} disabled={!content.trim()}>
        <Save size={20} />
        目標を保存する
      </button>
    </div>
  );
}
