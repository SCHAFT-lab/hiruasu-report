import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Mic, Square, Trash2 } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function NightForm() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // iOS Safariで最も安定する設定。timeslice(1000ms)を指定することでデータの欠落を防ぐ
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        // 録音停止後にBlobを生成。ここで確実にデータを結合する
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        if (blob.size > 0) {
          setAudioBlob(blob);
        } else {
          alert("録音データが空です。もう一度録音してください。");
        }
      };

      // 1秒ごとにデータを蓄積（iOSでの安定性を向上）
      mediaRecorder.start(1000);
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("マイクの使用が許可されていないか、他のアプリで使用中です。");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // すぐにストリームを止めず、少し待ってから停止（iOSのデータ書き込み時間を確保）
      setTimeout(() => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      }, 500);
    }
  };

  const handleSave = async () => {
    if (!audioBlob) return;
    
    setIsSaving(true);
    try {
      // 最終的な保存処理
      await saveLog({ type: 'night', content: '', audioBlob: audioBlob });
      navigate('/history');
    } catch (err) {
      console.error(err);
      alert("保存に失敗しました。");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) return <div className="content"><p className="text-center">読み込み中...</p></div>;

  return (
    <div className="content">
      <div className="form-group recording-block">
        <h4 style={{ marginBottom: '0.8rem', color: '#1B3022', fontSize: '1.2rem', fontWeight: '800', borderLeft: '5px solid var(--accent-mint)', paddingLeft: '12px' }}>
          🎙️ 音声で記録する
        </h4>
        <p className="text-sm text-muted mb-4">録音停止後、プレイヤーが出現したら保存可能です。</p>
        
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
          <li>Q1〜Q10まで表示されています</li>
          {[...Array(10)].map((_, i) => (
            <li key={i}><span className="guide-num">Q{i+1}：</span> {getQuestionText(i+1)}</li>
          ))}
        </ul>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={handleSave} 
        disabled={!audioBlob || isRecording || isSaving}
      >
        <Save size={20} />
        {isSaving ? '保存中...' : '振り返りを保存する'}
      </button>
    </div>
  );
}

// 質問文のヘルパー
function getQuestionText(num) {
  const texts = [
    "今日の目標は何でしたか？",
    "目標に対して、手応え（達成度）は何％くらいですか？",
    "具体的に「できたこと」と「できなかったこと」を、思いつくままに挙げてください。",
    "今日、一番「迷いなく動けた」「自分らしく振る舞えた」と感じた瞬間はどこですか？",
    "その時、周囲はどんな反応をしていましたか？ また、それを見てあなたはどう感じましたか？",
    "実習中、実は「あ、今これやるべきかも」と一瞬頭をよぎったのに、結局動かなかった場面はありますか？",
    "その時、心のなかで自分に対してどんな「言い訳」をしましたか？",
    "今日一番「心が揺れた（モヤっとした、ドキッとした）」感情に名前をつけるなら何ですか？",
    "その感情は、これまでの人生や過去の実習でも似たような経験がありましたか？",
    "以上の振り返りを踏まえて、明日の自分にアドバイスを送るなら何と言いますか？"
  ];
  return texts[num - 1];
}
