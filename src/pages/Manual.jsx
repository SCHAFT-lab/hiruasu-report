import React from 'react';
import { Smartphone, ExternalLink, Download, Copy, Upload } from 'lucide-react';

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
          <Smartphone size={20} color="var(--primary-color)" /> 基本の操作
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
            「録音を開始する」から、音声を録音して保存します。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/night_mobile.png`} alt="夜の振り返り" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>
      </div>

      <div className="guide-section" style={{ marginBottom: '64px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ExternalLink size={20} color="var(--primary-color)" /> NotebookLM 連携の手順
        </h3>
        
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>4-1. 音声をダウンロードする</h4>
          <p className="text-muted text-sm mb-3">
            履歴画面の「音声をダウンロード」ボタンを押し、音声ファイルを端末に保存します。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/history_mobile.png`} alt="音声をダウンロード" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>4-2. NotebookLM を立ち上げる</h4>
          <p className="text-muted text-sm mb-3">
            「NotebookLM」ボタンを押すと、レポート内容がコピーされ、NotebookLMが立ち上がります。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/notebooklm_guide.png`} alt="NotebookLMボタン" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>4-3. ソースをアップロードする</h4>
          <p className="text-muted text-sm mb-3">
            NotebookLMの画面で、先ほど保存した音声ファイルや、コピーしたテキストをソースとして追加（アップロード）します。これでAIによる振り返り分析が可能です。
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a 
            href="https://notebooklm.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px' }}
          >
            NotebookLM を開く <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="guide-section" style={{ marginBottom: '40px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> よくある質問
        </h3>
        
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>Q. NotebookLMで音声がエラーになります</h4>
          <p className="text-muted text-sm" style={{ lineHeight: '1.6' }}>
            NotebookLMは一部の音声形式（WebMなど）に非対応な場合があります。<br />
            エラーが出る場合は、<strong>iPhoneのSafari</strong>からアプリを使用して録音・ダウンロードしていただくと、対応済みの形式（.m4a）で保存されるため、スムーズに連携できます。
          </p>
        </div>
        
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>Q. 日付が変わったらどうなりますか？</h4>
          <p className="text-muted text-sm" style={{ lineHeight: '1.6' }}>
            日付が変わると、入力画面は自動的に新しい日のためにリセットされます。<br />
            前日までの記録は消えることなく、すべて<strong>「履歴」</strong>タブに保存されますので、安心して毎日記録を続けてください。
          </p>
        </div>
      </div>
    </div>
  );
}
