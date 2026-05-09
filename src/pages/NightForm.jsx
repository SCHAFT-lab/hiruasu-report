import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Mic, Square, Trash2 } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function NightForm() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  const { saveLog, getTodayLog, isLoaded } = useLogs();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;
    const todayLog = getTodayLog();
    if (todayLog && todayLog.nightAudio) {
      setAudioBlob(todayLog.nightAudio);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAudioUrl(null);
    }
  }, [audioBlob]);

  const stopAndGetBlob = () => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        resolve(audioBlob);
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
      setIsRecording(false);
    });
  };

  const handleSave = async () => {
    let finalBlob = audioBlob;
    
    // 録音中なら停止してデータを取得
    if (isRecording) {
      finalBlob = await stopAndGetBlob();
    }
    
    if (finalBlob) {
      saveLog({ type: 'night', content: '', audioBlob: finalBlob });
      navigate('/history');
    } else {
      alert("録音データが見つかりません。");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("マイクの使用を許可してください。");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (!isLoaded) return <div className="content"><p className="text-center">読み込み中...</p></div>;

  return (
    <div className="content">
      <div className="form-group recording-block">
        <h4 style={{ marginBottom: '0.8rem', color: '#1B3022', fontSize: '1.2rem', fontWeight: '800', borderLeft: '5px solid var(--accent-mint)', paddingLeft: '12px' }}>
          🎙️ 音声で記録する
        </h4>
        <p className="text-sm text-muted mb-4">録音して保存ボタンを押すと、履歴に保存されます。</p>
        
        {!audioBlob ? (
          <div>
            {!isRecording ? (
              <button className="btn btn-primary" onClick={startRecording}>
                <Mic size={24} />
                録音を開始する
              </button>
            ) : (
              <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '1rem', borderRadius: '16px', border: '2px solid var(--accent-mint)' }}>
                <div style={{ color: '#FF5252', fontWeight: 'bold', marginBottom: '12px' }}>
                  <span className="recording-dot">●</span> 録音中...
                </div>
                <button className="btn btn-outline" onClick={stopRecording}>
                  <Square size={20} fill="var(--accent-mint)" />
                  録音を停止する
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <p className="text-sm text-muted mb-2">録音完了</p>
            <audio src={audioUrl} controls style={{ width: '100%', marginBottom: '1rem' }} />
            <button className="btn btn-outline" onClick={() => setAudioBlob(null)} style={{ color: '#FF5252', borderColor: '#FF5252' }}>
              <Trash2 size={18} />
              録り直す
            </button>
          </div>
        )}
      </div>

      <div className="reflection-guide">
        <h3>振り返りガイド</h3>
        <ul className="guide-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><span className="guide-num">Q1：</span> 今日の目標は何でしたか？</li>
          <li><span className="guide-num">Q2：</span> 目標に対して、手応え（達成度）は何％くらいですか？</li>
          <li><span className="guide-num">Q3：</span> 具体的に「できたこと」と「できなかったこと」を、思いつくままに挙げてください。</li>
          <li><span className="guide-num">Q4：</span> 今日、一番「迷いなく動けた」「自分らしく振る舞えた」と感じた瞬間はどこですか？</li>
          <li><span className="guide-num">Q5：</span> その時、周囲はどんな反応をしていましたか？ また、それを見てあなたはどう感じましたか？</li>
          <li><span className="guide-num">Q6：</span> 実習中、実は「あ、今これやるべきかも」と一瞬頭をよぎったのに、結局動かなかった場面はありますか？</li>
          <li><span className="guide-num">Q7：</span> その時、心のなかで自分に対してどんな「言い訳」をしましたか？</li>
          <li><span className="guide-num">Q8：</span> 今日一番「心が揺れた（モヤっとした、ドキッとした）」感情に名前をつけるなら何ですか？</li>
          <li><span className="guide-num">Q9：</span> その感情は、これまでの人生や過去の実習でも似たような経験がありましたか？</li>
          <li><span className="guide-num">Q10：</span> 以上の振り返りを踏まえて、明日の自分に「これだけは意識して」とアドバイスを送るなら何と言いますか？</li>
        </ul>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={!audioBlob && !isRecording}>
        <Save size={20} />
        振り返りを保存する
      </button>
    </div>
  );
}
