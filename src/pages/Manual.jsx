import React from 'react';
import { ExternalLink } from 'lucide-react';

export function Manual() {
  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '8px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '32px' }}>
          アプリの基本的な使い方を画像で確認できます。
        </p>
      </div>

      {/* 基本の操作 */}
      <div className="guide-section" style={{ marginBottom: '48px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', color: '#1B3022', fontWeight: '700' }}>
          基本の操作
        </h3>

        <div className="guide-step" style={{ marginBottom: '40px' }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '12px', fontWeight: '700' }}>1. 朝の目標入力</h4>
          <p className="text-muted text-sm mb-4">
            ホーム画面から「目標を入力する」をタップし、その日のゴール（例：「自主的に動く」）を入力して保存します。
          </p>
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '340px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/morning_step.png`} alt="朝の目標入力" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        <div className="guide-step" style={{ marginBottom: '40px' }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '12px', fontWeight: '700' }}>2. 夜の振り返り</h4>
          <p className="text-muted text-sm mb-4">
            「録音を開始する」から、音声を録音して保存します。
          </p>
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '340px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/night_step.png`} alt="夜の振り返り" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* NotebookLM 連携の手順 */}
      <div className="guide-section" style={{ marginBottom: '48px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', color: '#1B3022', fontWeight: '700' }}>
          NotebookLM 連携の手順
        </h3>

        <div className="guide-step" style={{ marginBottom: '32px' }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '8px', fontWeight: '700' }}>4-1. 音声をダウンロードする</h4>
          <p className="text-muted text-sm mb-4">
            履歴画面の「音声をダウンロード」ボタンを押し、音声ファイルを端末に保存します。
          </p>
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '340px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/history_card.png`} alt="音声をダウンロード" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        <div className="guide-step" style={{ marginBottom: '32px' }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '8px', fontWeight: '700' }}>4-2. NotebookLM を立ち上げる</h4>
          <p className="text-muted text-sm mb-4">
            「NotebookLM」ボタンを押すと、レポート内容がコピーされ、NotebookLMが立ち上がります。
          </p>
          <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #e0e0e0', maxWidth: '280px', marginBottom: '16px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/notebooklm_icon.png`} alt="NotebookLMボタン" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        <div className="guide-step" style={{ marginBottom: '32px' }}>
          <h4 style={{ color: '#2E7D32', marginBottom: '8px', fontWeight: '700' }}>4-3. ソースをアップロードする</h4>
          <p className="text-muted text-sm mb-16">
            NotebookLMの画面で、先ほど保存した音声ファイルや、コピーしたテキストをソースとして追加（アップロード）します。これでAIによる振り返り分析が可能です。
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a 
            href="https://notebooklm.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '16px 40px',
              backgroundColor: '#FFCC33', // スクリーンショットに近い黄色
              color: '#1B3022',
              fontWeight: '800',
              borderRadius: '30px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(255, 204, 51, 0.4)'
            }}
          >
            NotebookLM を開く <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* よくある質問 */}
      <div className="guide-section" style={{ marginTop: '64px', marginBottom: '40px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', color: '#1B3022', fontWeight: '700' }}>
          よくある質問
        </h3>
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px', fontWeight: '700' }}>Q. 日付が変わったらどうなりますか？</h4>
          <p className="text-muted text-sm" style={{ lineHeight: '1.8' }}>
            日付が変わると、入力画面は自動的に新しい日のためにリセットされます。<br />
            前日までの記録は消えることなく、すべて<strong>「履歴」</strong>タブに保存されますので、安心して毎日記録を続けてください。
          </p>
        </div>
      </div>
    </div>
  );
}
