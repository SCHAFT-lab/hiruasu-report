import React from 'react';
import { Smartphone, Tablet } from 'lucide-react';

export function Manual() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="content manual-page">
      <div className="manual-header">
        <h2 style={{ color: '#1B3022', fontWeight: '800', marginBottom: '16px' }}>使い方ガイド</h2>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          アプリの基本的な使い方を動画で確認できます。お使いの端末に合わせて選んでください。
        </p>

        <div className="toc-container" style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button 
            className="btn btn-primary" 
            style={{ flex: 1, padding: '12px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            onClick={() => scrollToSection('mobile-section')}
          >
            <Smartphone size={24} />
            スマホ画面版
          </button>
          <button 
            className="btn btn-outline" 
            style={{ flex: 1, padding: '12px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            onClick={() => scrollToSection('ipad-section')}
          >
            <Tablet size={24} />
            iPad画面版
          </button>
        </div>
      </div>

      <div id="mobile-section" className="guide-section" style={{ marginBottom: '64px', paddingTop: '20px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={20} color="var(--primary-color)" /> スマホ画面版
        </h3>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>1. 朝の目標入力</h4>
          <p className="text-muted text-sm mb-3">ホーム画面から目標を入力し、保存するまでの流れです。</p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/morning_goal_mobile_1778305970056.webp`} alt="スマホ版 朝の目標入力" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>2. 夜の振り返り（録音）</h4>
          <p className="text-muted text-sm mb-3">音声で振り返りを記録し、保存して履歴画面へ進むまでの流れです。</p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/night_reflection_mobile_1778306066469.webp`} alt="スマホ版 夜の振り返り" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>
      </div>

      <div id="ipad-section" className="guide-section" style={{ marginBottom: '40px', paddingTop: '20px' }}>
        <h3 style={{ borderBottom: '2px solid var(--accent-mint)', paddingBottom: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tablet size={20} color="var(--primary-color)" /> iPad画面版
        </h3>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>1. 朝の目標入力</h4>
          <p className="text-muted text-sm mb-3">ホーム画面から目標を入力し、保存するまでの流れです。</p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/morning_goal_ipad_1778306388820.webp`} alt="iPad版 朝の目標入力" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>

        <div className="guide-step">
          <h4 style={{ color: '#2E7D32', marginBottom: '12px' }}>2. 夜の振り返り（録音）</h4>
          <p className="text-muted text-sm mb-3">音声で振り返りを記録し、保存して履歴画面へ進むまでの流れです。</p>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #ddd', marginBottom: '32px' }}>
            <img src={`${import.meta.env.BASE_URL}guides/night_reflection_ipad_1778306480239.webp`} alt="iPad版 夜の振り返り" style={{ width: '100%', display: 'block' }} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
