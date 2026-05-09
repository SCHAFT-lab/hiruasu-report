import React from 'react';

export function Manual() {
  return (
    <div className="content manual-page" style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>使い方ガイド</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>
        アプリの基本的な使い方を画像で確認できます。
      </p>

      {/* 基本の操作 */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '24px' }}>
        基本の操作
      </h2>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
          1. 朝の目標入力
        </h3>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '16px' }}>
          ホーム画面から「目標を入力する」をタップし、その日のゴール（例：「自主的に動く」）を入力して保存します。
        </p>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', maxWidth: '340px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/morning_step.png`} alt="朝の目標入力" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
          2. 夜の振り返り
        </h3>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '16px' }}>
          「録音を開始する」から、音声を録音して保存します。
        </p>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', maxWidth: '340px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/night_step.png`} alt="夜の振り返り" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      {/* NotebookLM 連携の手順 */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '24px' }}>
        NotebookLM 連携の手順
      </h2>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
          4-1. 音声をダウンロードする
        </h3>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '16px' }}>
          履歴画面の「音声をダウンロード」ボタンを押し、音声ファイルを端末に保存します。
        </p>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', maxWidth: '340px', marginBottom: '16px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/download_confirm.png`} alt="ダウンロード確認" style={{ width: '100%', display: 'block' }} />
        </div>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          ※保存された音声は、端末の「ファイル」アプリ内に保存されます。
        </p>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', maxWidth: '180px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/files_app.png`} alt="ファイルアプリ" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
          4-2. NotebookLM を立ち上げる
        </h3>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '16px' }}>
          「NotebookLM」ボタンを押すと、レポート内容がコピーされ、NotebookLMが立ち上がります。
        </p>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd', maxWidth: '340px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/notebooklm_new.png`} alt="NotebookLM新規作成" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      <div style={{ paddingBottom: '64px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
          4-3. ソースをアップロードする
        </h3>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '32px' }}>
          NotebookLMの画面で、先ほど保存した音声ファイルや、コピーしたテキストをソースとして追加（アップロード）します。これでAIによる振り返り分析が可能です。
        </p>
        <div style={{ textAlign: 'center' }}>
          <a 
            href="https://notebooklm.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: 'inline-block', 
              padding: '16px 48px', 
              backgroundColor: '#FFCC33', 
              color: '#1B3022', 
              fontWeight: 'bold', 
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            NotebookLM を開く
          </a>
        </div>
      </div>
    </div>
  );
}
