import React from 'react';
import { Smartphone, Layout } from 'lucide-react';

export function Manual() {
  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '16px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          アプリの基本的な使い方と、AI（NotebookLM）との連携方法を解説します。
        </p>
      </div>

      {/* 目標入力 */}
      <div className="guide-section" style={{ marginBottom: '48px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 1. 朝の目標を入力する
        </h3>
        <p className="text-muted text-sm mb-4">
          「今日の目標」に日本語で<strong>「自主的に動く」</strong>と入力した例です。保存すると履歴に残ります。
        </p>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '300px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/morning_step.png`} alt="目標入力画面" style={{ width: '100%', display: 'block' }} loading="lazy" />
        </div>
      </div>

      {/* 振り返り */}
      <div className="guide-section" style={{ marginBottom: '48px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 2. 夜の振り返りを記録する
        </h3>
        <p className="text-muted text-sm mb-4">
          「録音を開始する」から、音声で一日の振り返りを記録して保存します。
        </p>
      </div>

      {/* 履歴と連携 */}
      <div className="guide-section" style={{ marginBottom: '48px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layout size={20} color="var(--primary-color)" /> 3. 履歴の確認とNotebookLM連携
        </h3>
        <p className="text-muted text-sm mb-4">
          履歴画面から過去のレポートを確認できます。<strong>「音声をDL」</strong>で端末に音声を保存し、<strong>「NotebookLM」</strong>ボタンでAI連携を開始します。
        </p>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '300px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/history_mobile.png`} alt="履歴画面" style={{ width: '100%', display: 'block' }} loading="lazy" />
        </div>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '24px', maxWidth: '300px' }}>
          <img src={`${import.meta.env.BASE_URL}guides/notebooklm_guide.png`} alt="NotebookLM連携" style={{ width: '100%', display: 'block' }} loading="lazy" />
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
