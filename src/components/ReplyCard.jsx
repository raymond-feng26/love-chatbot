import { useState, useEffect } from 'react';

// Tone color config
const TONE_COLORS = {
  flirt: { tone: '#f55c93', toneSoft: '#ffe1ec', tone50: '#fff3f7' },
  normal: { tone: '#8a3fc4', toneSoft: '#f4e7fa', tone50: '#fbf5fd' },
  cool: { tone: '#6f7fcc', toneSoft: '#e4ecff', tone50: '#f1f4ff' },
};

function CopySVG() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckSVG() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ReplyCard({ tone, text, loading, error, onCopy, index = 0 }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);

  const colors = TONE_COLORS[tone?.key] || TONE_COLORS.normal;

  const delays = [0, 70, 140];
  const animationDelay = `${delays[index] ?? 0}ms`;

  const showMeta = !loading && !error && text;
  const showCopy = !loading && !error && text;
  const charCount = text ? [...text].length : 0;

  function handleCopy() {
    if (!text) return;
    // clipboard write with textarea fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    setCopied(true);
    if (onCopy) onCopy(text);
  }

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  function fallbackCopy(str) {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  // Card border/hover styles
  const cardStyle = {
    background: '#ffffff',
    border: `1px solid ${hovered ? colors.toneSoft : '#ece6f3'}`,
    borderRadius: '16px',
    padding: '16px 16px 52px 16px',
    position: 'relative',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: hovered
      ? '0 4px 14px rgba(120,60,180,.08), 0 1px 3px rgba(74,40,120,.04)'
      : '0 1px 2px rgba(74,40,120,.04), 0 2px 8px rgba(74,40,120,.05)',
    transition: 'transform .2s, box-shadow .2s, border-color .2s',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    animation: 'card-rise .45s ease both',
    animationDelay,
  };

  // Tag styles
  const tagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: colors.tone50,
    color: colors.tone,
    fontSize: '12px',
    fontWeight: 500,
    padding: '5px 10px',
    borderRadius: '9999px',
    alignSelf: 'flex-start',
    border: `1px solid ${colors.toneSoft}`,
  };

  // Copy button styles
  let copyStyle = {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    border: '1px solid #ece6f3',
    background: '#ffffff',
    color: '#4a3f5b',
    borderRadius: '10px',
    height: '30px',
    padding: '0 10px',
    font: 'inherit',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all .15s',
  };

  if (copied) {
    copyStyle = {
      ...copyStyle,
      color: '#2a8b5b',
      borderColor: '#d1efdc',
      background: '#f1faf3',
    };
  } else if (copyHovered) {
    copyStyle = {
      ...copyStyle,
      color: colors.tone,
      borderColor: colors.toneSoft,
      background: colors.tone50,
    };
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tag */}
      <div style={tagStyle}>
        <span>{tone?.emoji}</span>
        <span>{tone?.label}</span>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ marginTop: '12px', display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span
            className="inline-block rounded-full animate-loading-dot"
            style={{ width: '5px', height: '5px', background: '#d6abe9', animationDelay: '0ms' }}
          />
          <span
            className="inline-block rounded-full animate-loading-dot"
            style={{ width: '5px', height: '5px', background: '#d6abe9', animationDelay: '150ms' }}
          />
          <span
            className="inline-block rounded-full animate-loading-dot"
            style={{ width: '5px', height: '5px', background: '#d6abe9', animationDelay: '300ms' }}
          />
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div style={{ marginTop: '12px', color: '#f55c93', fontSize: '14px' }}>
          生成失败，请重试
        </div>
      )}

      {/* Reply text */}
      {!loading && !error && text && (
        <div
          style={{
            marginTop: '12px',
            color: '#1d1726',
            fontSize: '15px',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {text}
        </div>
      )}

      {/* Meta row */}
      {showMeta && (
        <div
          style={{
            marginTop: '10px',
            color: '#8a7e9a',
            fontSize: '11.5px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              background: '#fafaff',
              border: '1px solid #f6f1fb',
              padding: '2px 8px',
              borderRadius: '9999px',
            }}
          >
            {charCount} 字
          </span>
          <span
            style={{
              background: '#fafaff',
              border: '1px solid #f6f1fb',
              padding: '2px 8px',
              borderRadius: '9999px',
            }}
          >
            {tone?.hint}
          </span>
        </div>
      )}

      {/* Copy button */}
      {showCopy && (
        <button
          style={copyStyle}
          onClick={handleCopy}
          onMouseEnter={() => setCopyHovered(true)}
          onMouseLeave={() => setCopyHovered(false)}
        >
          {copied ? <CheckSVG /> : <CopySVG />}
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
      )}
    </div>
  );
}
