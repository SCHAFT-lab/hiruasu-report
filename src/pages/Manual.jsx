import React from 'react';
import { Smartphone, ExternalLink } from 'lucide-react';

export function Manual() {
  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '16px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          アプリの基本的な使い方を画像で確認できます。
        </p>
      </div>

      <div className="guide-section" style={{ marginBottom: '64px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 操作手順
        </h3>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>1. 朝の目標入力</h4>
          <p className="text-muted text-sm mb-3">
            ホーム画面から「目標を入力する」をタップし、その日のゴール（例：「自主的に動く」）を入力して保存します。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/morning_mobile.png`} alt="朝の目標入力" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>2. 夜の振り返り</h4>
          <p className="text-muted text-sm mb-3">
            夜になったら「振り返りを記録する」から、音声を録音して保存します。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/night_mobile.png`} alt="夜の振り返り" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>3. 履歴の確認</h4>
          <p className="text-muted text-sm mb-3">
            「履歴」タブでは、設定した目標（例：「自主的に動く」）と、録音した音声データを確認できます。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/history_mobile.png`} alt="履歴の確認" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>4. NotebookLM 連携</h4>
          <p className="text-muted text-sm mb-3">
            履歴にある「NotebookLM」ボタンを押すと、テキストがコピーされ、音声ファイルが自動的にダウンロードされます。
            その後、NotebookLMを開いて、これらをソースとしてアップロードすることで深い分析が可能です。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/notebooklm_guide.png`} alt="NotebookLM連携" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <a 
              href="https://notebooklm.google.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
            >
              NotebookLMを開く <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
