import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Mic, Square, Trash2 } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function NightForm() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const streamRef = useRef(null);
  const leftChannelRef = useRef([]);
  const recordingLengthRef = useRef(0);
  const sampleRateRef = useRef(44100);

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

  // WAVエンコーダー関数
  const createWavBlob = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 32 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // Mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([view], { type: 'audio/wav' });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      sampleRateRef.current = audioContext.sampleRate;

      const source = audioContext.createMediaStreamSource(stream);
      // Buffer size 4096
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      leftChannelRef.current = [];
      recordingLengthRef.current = 0;

      processor.onaudioprocess = (e) => {
        const left = e.inputBuffer.getChannelData(0);
        leftChannelRef.current.push(new Float32Array(left));
        recordingLengthRef.current += 4096;
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
      alert("マイクの使用を許可してください。");
    }
  };

  const stopRecording = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      audioContextRef.current.close();
      streamRef.current.getTracks().forEach(track => track.stop());
      
      // 平坦化
      const samples = new Float32Array(recordingLengthRef.current);
      let offset = 0;
      for (let i = 0; i < leftChannelRef.current.length; i++) {
        samples.set(leftChannelRef.current[i], offset);
        offset += leftChannelRef.current[i].length;
      }
      
      const blob = createWavBlob(samples, sampleRateRef.current);
      setAudioBlob(blob);
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
          🎙️ 音声で記録する (WAV形式)
        </h4>
        <p className="text-sm text-muted mb-4">NotebookLMに最適化された高互換モードで録音します。</p>
        
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
            <p className="text-sm text-muted mb-2">録音完了（WAV）</p>
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
        <ul className="guide-list">
          <li>Q1：今日の目標は何でしたか？</li>
          <li>Q2：目標に対して、手応えは何％くらいですか？</li>
          <li>Q3：具体的に「できたこと」と「できなかったこと」は？</li>
          <li>Q10：明日の自分にアドバイスを送るなら？</li>
        </ul>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={!audioBlob || isRecording}>
        <Save size={20} />
        振り返りを保存する
      </button>
    </div>
  );
}
