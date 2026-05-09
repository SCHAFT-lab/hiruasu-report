import React from 'react';
import { Smartphone, ExternalLink, Download, Layout, PlayCircle } from 'lucide-react';

export function Manual() {
  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '16px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          アプリの基本的な使い方と、AI（NotebookLM）との連携方法を解説します。
        </p>
      </div>

      {/* 基本操作セクション */}
      <div className="guide-section" style={{ marginBottom: '64px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 基本の操作手順
        </h3>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>1. 朝の目標入力と保存</h4>
          <p className="text-muted text-sm mb-3">
            ホーム画面の「目標を入力する」から、その日の目標を入力して保存します。
          </p>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>2. 夜の振り返り（音声録音）</h4>
          <p className="text-muted text-sm mb-3">
            「振り返りを記録する」から音声を録音します。録音停止後、そのまま「振り返りを保存する」を押して完了です。
          </p>
        </div>
      </div>

      {/* NotebookLM連携セクション */}
      <div className="guide-section" style={{ marginBottom: '64px', backgroundColor: '#f9fdfa', padding: '24px', borderRadius: '24px', border: '1px solid #e0f2f1' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layout size={20} color="var(--primary-color)" /> NotebookLM連携の手順
        </h3>
        
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>STEP 1：音声を端末に保存する</h4>
          <p className="text-muted text-sm mb-3">
            下のメニューから<strong>「履歴」</strong>を開きます。該当するレポートの<strong>「音声をダウンロード」</strong>ボタンを押し、iPadやスマホの本体（「ファイル」アプリなど）に保存します。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '500px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/history_card_video.png`} alt="履歴からダウンロード" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>STEP 2：NotebookLMを立ち上げる</h4>
          <p className="text-muted text-sm mb-3">
            <strong>「NotebookLM」</strong>ボタンを押すと、レポートのテキストが自動的にコピーされ、NotebookLMのサイトが開きます。
          </p>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>STEP 3：ソースを追加（アップロード）する</h4>
          <p className="text-muted text-sm mb-3">
            NotebookLMの画面で<strong>「ソースを追加」</strong>をタップし、<strong>「ファイルのアップロード」</strong>を選択。先ほど保存した音声ファイルを選んでアップロードします。
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '500px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/notebooklm_steps_video.png`} alt="NotebookLMへのアップロード" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>STEP 4：AIによる分析</h4>
          <p className="text-muted text-sm mb-3">
            アップロードが完了すると、AIが音声を解析します。要約の作成や、音声ガイドの生成など、自由な分析が可能になります。
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
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

      {/* よくある質問 */}
      <div className="guide-section" style={{ marginBottom: '40px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> よくある質問
        </h3>
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>Q. 日付が変わったらどうなりますか？</h4>
          <p className="text-muted text-sm" style={{ lineHeight: '1.6' }}>
            日付が変わると入力画面はリセットされますが、前日までの記録はすべて<strong>「履歴」</strong>タブに保存されています。
          </p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', backgroundColor: '#f0f4f8', borderRadius: '16px' }}>
        <p className="text-sm text-muted mb-3">動画で詳しい手順を確認したい方はこちら</p>
        <a 
          href="https://youtu.be/ii16rTmLsV8" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-outline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <PlayCircle size={20} /> 解説動画を視聴する
        </a>
      </div>
    </div>
  );
}
