import React from 'react';
import { Smartphone, Tablet, Layout, CheckCircle } from 'lucide-react';

export function Manual() {
  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '16px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          アプリの基本的な使い方と、各デバイスでの操作方法を解説します。
        </p>
      </div>

      {/* 1. 朝の目標 */}
      <div className="guide-section" style={{ marginBottom: '56px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 1. 朝の目標を入力する
        </h3>
        <p className="text-muted text-sm mb-4">
          ホーム画面でその日の目標を入力します（例：<strong>「自主的に動く」</strong>）。保存すると自動的に「履歴」に記録されます。
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <p className="text-xs text-muted mb-2">【スマホ画面】</p>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd' }}>
              <img src={`${import.meta.env.BASE_URL}guides/morning_step.png`} alt="スマホ目標入力" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 夜の振り返り */}
      <div className="guide-section" style={{ marginBottom: '56px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> 2. 夜の振り返りを録音する
        </h3>
        <p className="text-muted text-sm mb-4">
          夜になったら「振り返りを記録する」から音声を録音します。
        </p>
        <div style={{ padding: '16px', backgroundColor: '#f0f4f2', borderRadius: '12px', borderLeft: '4px solid var(--accent-mint)' }}>
          <p className="text-sm" style={{ fontWeight: '600', color: '#2E7D32' }}>💡 ポイント</p>
          <p className="text-xs text-muted">録音中にそのまま「保存」ボタンを押すと、自動で停止して保存まで完了します。</p>
        </div>
      </div>

      {/* 3. デバイスごとの履歴確認 */}
      <div className="guide-section" style={{ marginBottom: '56px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layout size={20} color="var(--primary-color)" /> 3. 履歴の確認とNotebookLM連携
        </h3>
        <p className="text-muted text-sm mb-4">
          「履歴」タブから過去のレポートを確認・活用できます。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* スマホ */}
          <div>
            <p className="text-sm font-bold mb-2" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Smartphone size={16} /> スマホ（iPhone）
            </p>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd' }}>
              <img src={`${import.meta.env.BASE_URL}guides/history_mobile.png`} alt="スマホ履歴" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
          
          {/* iPad */}
          <div>
            <p className="text-sm font-bold mb-2" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tablet size={16} /> iPad / PC
            </p>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd' }}>
              <img src={`${import.meta.env.BASE_URL}guides/history_ipad.png`} alt="iPad履歴" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fff9c4', borderRadius: '12px', border: '1px solid #fbc02d' }}>
          <p className="text-sm font-bold mb-2">NotebookLMへのアップロード方法</p>
          <ol className="text-xs text-muted" style={{ paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li>履歴の「音声をDL」ボタンで音声を端末に保存</li>
            <li>「NotebookLM」ボタンを押してサイトを開く（テキストは自動コピー済み）</li>
            <li>NotebookLM側で「ソースを追加」→「ファイルをアップロード」で音声を選択</li>
          </ol>
        </div>
      </div>

      {/* FAQ */}
      <div className="guide-section">
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={20} color="var(--primary-color)" /> よくある質問
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
