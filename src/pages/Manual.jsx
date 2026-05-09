import React from 'react';
import { Smartphone, Layout } from 'lucide-react';

export function Manual() {
  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '16px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          アプリの基本的な使い方を解説します。
        </p>
      </div>

      <div className="guide-section" style={{ marginBottom: '64px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 基本の操作手順
        </h3>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>1. 朝の目標入力</h4>
          <p className="text-muted text-sm mb-3">
            ホーム画面の「目標を入力する」から、その日の目標を入力して保存します。
          </p>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>2. 夜の振り返り</h4>
          <p className="text-muted text-sm mb-3">
            夜になったら「録音を開始する」から、音声を録音して保存します。
          </p>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>3. NotebookLM 連携</h4>
          <p className="text-muted text-sm mb-3">
            履歴にある<strong>音声をDLボタン</strong>を押して、端末に音声データを保存します。
            その後、<strong>NotebookLMボタン</strong>を押すと、レポートのテキストがコピーされた状態でNotebookLMが立ち上がりますので、ソースをアップロードして活用してください。
          </p>
        </div>
      </div>

      <div className="guide-section" style={{ marginBottom: '40px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layout size={20} color="var(--primary-color)" /> よくある質問
        </h3>
        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>Q. 日付が変わったらどうなりますか？</h4>
          <p className="text-muted text-sm" style={{ lineHeight: '1.6' }}>
            日付が変わると入力画面はリセットされますが、前日までの記録はすべて<strong>「履歴」</strong>タブに保存されています。
          </p>
        </div>
      </div>
    </div>
  );
}
