import { useState, useEffect } from 'react';
import { Copy, Check, Download, Trash2 } from 'lucide-react';
import { useLogs } from '../hooks/useLogs';

export function History() {
  const { logs, deleteLog, isLoaded } = useLogs();
  const [copiedId, setCopiedId] = useState(null);

  const handleDelete = (id, date) => {
    if (window.confirm(`${date} のレポートを削除してもよろしいですか？`)) {
      deleteLog(id);
    }
  };

  // We need to store ObjectURLs for audio to avoid memory leaks, but keeping it simple
  // by creating them inline for display. To be perfectly safe, we should manage them.
  // We'll create a helper component for audio items.

  const handleCopy = (log) => {
    const textToCopy = `【日付】${log.date}\n\n【今日の目標】\n${log.morning || '未入力'}\n\n【振り返り】\n${log.night || '（音声記録）'}`;
    
    // 1. テキストをコピー（非同期だが、Safari等でもこの直後ならwindow.openが効きやすい）
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(log.id);

    // 2. 音声があればダウンロードを実行
    // Safari等のスマホブラウザでは非同期処理の中でのダウンロードがブロックされやすいため、
    // クリックイベントの直後に実行する
    if (log.nightAudio) {
      const url = URL.createObjectURL(log.nightAudio);
      const a = document.createElement('a');
      a.href = url;
      const ext = log.nightAudio.type.includes('webm') ? 'webm' : 'm4a';
      a.download = `振り返り音声_${log.date}.${ext}`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }

    // 3. 少し遅らせてNotebookLMを開く（ポップアップブロックを回避しやすくするため）
    // alertを出すとwindow.openが確実にブロックされるため、確認は別のアプローチにするか、
    // そのまま開くのがモバイルでは一般的です。
    const confirmMsg = "NotebookLM用の準備をしました！\n\n・テキスト：コピー済み\n・音声ファイル：保存開始\n\nOKを押すとNotebookLMを開きます。";
    if (window.confirm(confirmMsg)) {
      window.open('https://notebooklm.google.com/', '_blank');
    }
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isLoaded) return <div className="content"><p className="text-center">読み込み中...</p></div>;

  return (
    <div className="content">
      {logs.length === 0 ? (
        <p className="text-center text-muted mt-4">まだ履歴がありません。</p>
      ) : (
        logs.map((log) => (
          <div key={log.id} className="history-item">
            <div className="history-header">
              <span className="history-date">{log.date}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '6px 12px', width: 'auto', fontSize: '0.85rem' }}
                  onClick={() => handleCopy(log)}
                >
                  {copiedId === log.id ? (
                    <><Check size={16} color="#2E7D32" /> コピー完了</>
                  ) : (
                    <><Copy size={16} /> NotebookLM</>
                  )}
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '6px 12px', width: 'auto', fontSize: '0.85rem', borderColor: '#FFAB91', color: '#D84315' }}
                  onClick={() => handleDelete(log.id, log.date)}
                  title="削除"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="history-content">
              <div className="history-label">今日の目標</div>
              <div className="history-text">{log.morning || <span className="text-muted">未入力</span>}</div>
            </div>
            
            <div className="history-content mb-0">
              <div className="history-label">振り返り</div>
              
              {log.nightAudio && <AudioPlayer blob={log.nightAudio} date={log.date} />}
              
              {log.night ? (
                <div className="history-text mt-4">{log.night}</div>
              ) : (
                !log.nightAudio && <div className="history-text mt-4"><span className="text-muted">未入力</span></div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Separate component to manage ObjectURL lifecycle for Blobs
function AudioPlayer({ blob, date }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [blob]);

  if (!url) return null;

  // Determine file extension based on mime type
  const extension = blob.type.includes('webm') ? 'webm' : 
                    blob.type.includes('ogg') ? 'ogg' : 'm4a';
  const filename = `振り返り音声_${date}.${extension}`;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', marginTop: '8px' }}>
      <p className="text-sm text-muted mb-2">音声データ</p>
      <audio src={url} controls style={{ width: '100%', marginBottom: '8px' }} />
      <button 
        className="btn btn-outline" 
        style={{ fontSize: '0.85rem', padding: '6px 12px', width: 'auto', display: 'inline-flex' }}
        onClick={handleDownload}
      >
        <Download size={16} />
        音声をダウンロード
      </button>
    </div>
  );
}
