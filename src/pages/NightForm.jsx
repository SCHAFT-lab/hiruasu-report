import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Mic, Square, Trash2 } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function NightForm() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  // 高互換WAV生成関数 (16kHz / 16bit / Mono)
  const transcodeToWav = async (originalBlob) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    try {
      const arrayBuffer = await originalBlob.arrayBuffer();
      // decodeAudioDataをPromise化（古いSafari対応）
      const audioBuffer = await new Promise((resolve, reject) => {
        audioContext.decodeAudioData(arrayBuffer, resolve, reject);
      });
      
      const numChannels = 1;
      const targetSampleRate = 16000;
      
      // オフラインコンテキストを使ってリサンプリング
      const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      const offlineCtx = new OfflineContext(numChannels, audioBuffer.duration * targetSampleRate, targetSampleRate);
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineCtx.destination);
      source.start();
      const renderedBuffer = await offlineCtx.startRendering();
      
      const samples = renderedBuffer.getChannelData(0);
      const buffer = new ArrayBuffer(44 + samples.length * 2);
      const view = new DataView(buffer);

      const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      };

      writeString(0, 'RIFF');
      view.setUint32(4, 36 + samples.length * 2, true);
      writeString(8, 'WAVE');
      writeString(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true); // PCM
      view.setUint16(22, numChannels, true);
      view.setUint32(24, targetSampleRate, true);
      view.setUint32(28, targetSampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, 16, true);
      writeString(36, 'data');
      view.setUint32(40, samples.length * 2, true);

      let offset = 44;
      for (let i = 0; i < samples.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }

      return new Blob([view], { type: 'audio/wav' });
    } finally {
      audioContext.close();
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

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const originalBlob = new Blob(audioChunksRef.current, { type: mimeType });
        try {
          const wavBlob = await transcodeToWav(originalBlob);
          setAudioBlob(wavBlob);
        } catch (e) {
          console.error("Transcode error:", e);
          // 失敗しても元のデータを保存できるようにする
          setAudioBlob(originalBlob);
        }
        setIsProcessing(false);
        stream.getTracks().forEach(track => track.stop());
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

  const handleSave = () => {
    if (audioBlob) {
      saveLog({ type: 'night', content: '', audioBlob });
      navigate('/history');
    }
  };

  if (!isLoaded) return <div className="content"><p className="text-center">読み込み中...</p></div>;

  return (
    <div className="content">
      <div className="form-group recording-block">
        <h4 style={{ marginBottom: '0.8rem', color: '#1B3022', fontSize: '1.2rem', fontWeight: '800', borderLeft: '5px solid var(--accent-mint)', paddingLeft: '12px' }}>
          🎙️ 音声で記録する
        </h4>
        <p className="text-sm text-muted mb-4">録音停止後、NotebookLM用に自動変換されます。</p>
        
        {!audioBlob ? (
          <div>
            {!isRecording ? (
              <button className="btn btn-primary" onClick={startRecording} disabled={isProcessing}>
                <Mic size={24} />
                {isProcessing ? '処理中...' : '録音を開始する'}
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
            <p className="text-sm text-muted mb-2">録音完了（最適化済み）</p>
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
          <li><span className="guide-num">Q6：</span> 実習中、実は「あ、今これやるべきかも」と一瞬頭をよぎったのに、結局動かなかった（または後回しにした）場面はありますか？</li>
          <li><span className="guide-num">Q7：</span> その時、心のなかで自分に対してどんな「言い訳」をしましたか？</li>
          <li><span className="guide-num">Q8：</span> 今日一番「心が揺れた（モヤっとした、ドキッとした）」感情に名前をつけるなら何ですか？</li>
          <li><span className="guide-num">Q9：</span> その感情や「ついつい避けてしまうパターン」は、これまでの人生や過去の実習でも似たような経験がありましたか？</li>
          <li><span className="guide-num">Q10：</span> 以上の振り返りを踏まえて、明日の自分に「これだけは意識して」とアドバイスを送るなら何と言いますか？</li>
        </ul>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={!audioBlob || isRecording || isProcessing}>
        <Save size={20} />
        {isProcessing ? '変換中...' : '振り返りを保存する'}
      </button>
    </div>
  );
}
