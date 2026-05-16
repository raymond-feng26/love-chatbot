import { useState } from 'react';
import ImageUpload from './ImageUpload';
import Settings from './Settings';
import GenerateButton from './GenerateButton';

const StarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: '#c08792', pointerEvents: 'none' }}
  >
    <path d="M12 2l2.5 6 6.5.5-5 4.5 1.5 6.5L12 16l-5.5 3.5L8 13 3 8.5 9.5 8z" fill="none" stroke="currentColor" />
  </svg>
);

const textareaBaseStyle = {
  width: '100%',
  border: '1px solid #efe7e9',
  borderRadius: '16px',
  backgroundColor: '#fdfbfb',
  padding: '12px 14px',
  font: 'inherit',
  color: '#1d1726',
  resize: 'none',
  outline: 'none',
  minHeight: '132px',
  lineHeight: '1.6',
  fontSize: '14px',
  boxSizing: 'border-box',
  transition: 'border-color .15s ease, box-shadow .15s ease',
};

const inputBaseStyle = {
  width: '100%',
  border: '1px solid #efe7e9',
  borderRadius: '16px',
  backgroundColor: '#fdfbfb',
  padding: '12px 14px 12px 40px',
  font: 'inherit',
  color: '#1d1726',
  outline: 'none',
  fontSize: '14px',
  boxSizing: 'border-box',
  transition: 'border-color .15s ease, box-shadow .15s ease',
};

const focusStyle = {
  borderColor: '#d9b8c0',
  boxShadow: '0 0 0 4px rgba(192,135,146,.12)',
};

export default function Composer({
  msg,
  onMsgChange,
  intent,
  onIntentChange,
  image,
  onImageChange,
  persona,
  onPersonaChange,
  length,
  onLengthChange,
  language,
  onLanguageChange,
  loading,
  onGenerate,
  hasReplies,
  onToast,
  msgRef,
}) {
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [intentFocused, setIntentFocused] = useState(false);

  function handleTextareaKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onGenerate();
    }
  }

  function handleIntentKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onGenerate();
    }
  }

  return (
    <section
      id="composer"
      style={{
        background: '#ffffff',
        border: '1px solid #efe7e9',
        borderRadius: '22px',
        boxShadow: '0 2px 8px rgba(80,50,60,.06), 0 1px 2px rgba(80,50,60,.04)',
        padding: '18px',
        display: 'grid',
        gap: '14px',
      }}
    >
      {/* Row 1 — input + upload side by side */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: '14px',
        }}
        className="composer-row1"
      >
        {/* Left: textarea */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#4a3f5b',
              }}
            >
              对方说了什么
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#8a7e9a',
              }}
            >
              支持长消息 / 复制聊天记录
            </span>
          </div>
          <textarea
            ref={msgRef}
            value={msg}
            onChange={(e) => onMsgChange(e.target.value)}
            placeholder={"把ta发的最后一条（或几条）粘进来…\n例：在干嘛？怎么这么久不回我"}
            style={{
              ...textareaBaseStyle,
              ...(textareaFocused ? focusStyle : {}),
            }}
            onKeyDown={handleTextareaKeyDown}
            onFocus={() => setTextareaFocused(true)}
            onBlur={() => setTextareaFocused(false)}
          />
        </div>

        {/* Right: image upload */}
        <div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#4a3f5b',
              marginBottom: '6px',
            }}
          >
            截图（可选）
          </div>
          <ImageUpload image={image} onImageChange={onImageChange} onToast={onToast} />
        </div>
      </div>

      {/* Row 2 — intent input */}
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <StarIcon />
        </span>
        <input
          type="text"
          value={intent}
          onChange={(e) => onIntentChange(e.target.value)}
          placeholder="你想表达什么？（例：想约她周末喝咖啡，但别太直接）"
          style={{
            ...inputBaseStyle,
            ...(intentFocused ? focusStyle : {}),
          }}
          onKeyDown={handleIntentKeyDown}
          onFocus={() => setIntentFocused(true)}
          onBlur={() => setIntentFocused(false)}
        />
      </div>

      {/* Row 3 — Settings */}
      <Settings
        persona={persona}
        onPersonaChange={onPersonaChange}
        length={length}
        onLengthChange={onLengthChange}
        language={language}
        onLanguageChange={onLanguageChange}
      />

      {/* Row 4 — GenerateButton */}
      <GenerateButton
        loading={loading}
        label={hasReplies ? '重新生成' : '生成三种回复'}
        onClick={onGenerate}
        disabled={loading}
      />
    </section>
  );
}
