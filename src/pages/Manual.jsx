import React from 'react';

export function Manual() {
  const slides = [
    {
      title: "昼朝レポート作成サポート\n使い方ガイド",
      subtitle: "AI（NotebookLM）を活用した振り返り分析の全手順",
      isTitle: true
    },
    {
      step: "基本の操作",
      title: "1. 朝の目標入力",
      description: "ホーム画面から「目標を入力する」をタップし、その日のゴール（例：「自主的に動く」）を入力して保存します。",
      image: "morning_step.png"
    },
    {
      step: "基本の操作",
      title: "2. 夜の振り返り",
      description: "夜になったら「録音を開始する」から、音声を録音して保存します。",
      image: "night_step.png"
    },
    {
      step: "NotebookLM 連携の手順",
      title: "4-1. 音声をダウンロードする",
      description: "履歴画面の「音声をダウンロード」ボタンを押し、音声ファイルを端末に保存します。",
      image: "download_confirm.png"
    },
    {
      step: "保存場所の確認",
      title: "端末の「ファイル」アプリ",
      description: "保存された音声データは、端末内の「ファイル」アプリの中に格納されています。",
      image: "files_app.png",
      small: true
    },
    {
      step: "NotebookLM 連携の手順",
      title: "4-2. NotebookLM を立ち上げる",
      description: "「NotebookLM」ボタンを押すと、レポート内容がコピーされ、NotebookLMが立ち上がります。",
      image: "notebooklm_new.png"
    },
    {
      step: "NotebookLM 連携の手順",
      title: "4-3. ソースをアップロードする",
      description: "NotebookLMの画面で、先ほど保存した音声ファイルや、コピーしたテキストをソースとして追加（アップロード）します。これでAIによる分析が可能になります。",
      image: null
    }
  ];

  return (
    <div className="content manual-slides" style={{ backgroundColor: '#f0f4f2', padding: '20px 10px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p className="text-sm text-muted">※16:9のスライド形式です。スクリーンショットを撮ってKeynoteにご活用ください。</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
        {slides.map((slide, index) => (
          <div 
            key={index}
            style={{
              width: '100%',
              maxWidth: '800px',
              aspectRatio: '16 / 9',
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: slide.isTitle ? 'center' : 'flex-start',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #e0e8e4'
            }}
          >
            {/* 装飾用背景 */}
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(200,230,201,0.3) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 0
            }} />

            {slide.isTitle ? (
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#1B3022', lineHeight: '1.4', whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
                  {slide.title}
                </h1>
                <p style={{ fontSize: '18px', color: '#666' }}>{slide.subtitle}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', height: '100%', gap: '32px', zIndex: 1 }}>
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    {slide.step}
                  </span>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                    {slide.title}
                  </h2>
                  <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.7' }}>
                    {slide.description}
                  </p>
                </div>
                
                {slide.image && (
                  <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ 
                      width: slide.small ? '60%' : '100%', 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid #eee'
                    }}>
                      <img src={`${import.meta.env.BASE_URL}guides/${slide.image}`} alt={slide.title} style={{ width: '100%', display: 'block' }} />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* ページ番号 */}
            <div style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '12px', color: '#ccc' }}>
              Slide {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
