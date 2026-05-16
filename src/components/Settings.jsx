import { useState } from 'react';

const GearIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      flexShrink: 0,
      transition: 'transform .2s ease',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function getPillText(persona, length) {
  const lengthLabel = length === 'short' ? '短' : length === 'long' ? '长' : '中';
  const parts = [];
  if (persona && persona.trim()) parts.push('人设');
  parts.push(lengthLabel);
  return parts.join(' · ');
}

const fieldLabelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#8a7e9a',
  marginBottom: '6px',
  userSelect: 'none',
};

const inputBaseStyle = {
  width: '100%',
  border: '1px solid #ece6f3',
  borderRadius: '16px',
  backgroundColor: '#fdfbff',
  padding: '12px 14px',
  font: 'inherit',
  color: '#1d1726',
  outline: 'none',
  boxSizing: 'border-box',
  fontSize: '13px',
  transition: 'border-color .15s ease, box-shadow .15s ease',
};

function FocusInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...style,
        ...(focused
          ? { borderColor: '#d6abe9', boxShadow: '0 0 0 4px rgba(180,108,255,.1)' }
          : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function FocusSelect({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{
        ...style,
        ...(focused
          ? { borderColor: '#d6abe9', boxShadow: '0 0 0 4px rgba(180,108,255,.1)' }
          : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export default function Settings({ persona, onPersonaChange, length, onLengthChange }) {
  const [open, setOpen] = useState(false);

  const pillText = getPillText(persona, length);

  return (
    <details
      onToggle={(e) => setOpen(e.currentTarget.open)}
      style={{
        border: '1px solid #ece6f3',
        borderRadius: '16px',
        backgroundColor: '#fdfbff',
        overflow: 'hidden',
      }}
    >
      <summary
        style={{
          listStyle: 'none',
          cursor: 'pointer',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          color: '#4a3f5b',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        {/* Left side */}
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GearIcon />
          <span>高级设置</span>
          <span
            style={{
              backgroundColor: '#f4e7fa',
              color: '#6f2da5',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 500,
              lineHeight: '1.4',
            }}
          >
            {pillText}
          </span>
        </span>

        {/* Right side: chevron */}
        <ChevronIcon open={open} />
      </summary>

      {/* Settings body */}
      <div className="settings-body-grid">
        {/* Column 1: Persona */}
        <div>
          <label style={fieldLabelStyle}>
            人设 / 我是个怎样的人
            <span
              style={{
                marginLeft: '6px',
                color: '#d6abe9',
                fontSize: '11px',
              }}
            >
              越具体越准
            </span>
          </label>
          <FocusInput
            type="text"
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value)}
            placeholder="例：理工男 / 慢热 / 不太会聊天，但真诚"
            style={inputBaseStyle}
          />
        </div>

        {/* Column 2: Length */}
        <div>
          <label style={fieldLabelStyle}>回复长度</label>
          <div style={{ position: 'relative' }}>
            <FocusSelect
              value={length}
              onChange={(e) => onLengthChange(e.target.value)}
              style={{
                ...inputBaseStyle,
                appearance: 'none',
                WebkitAppearance: 'none',
                paddingRight: '36px',
                cursor: 'pointer',
              }}
            >
              <option value="short">短 · 一两句</option>
              <option value="medium">中 · 三五句</option>
              <option value="long">长 · 详细一点</option>
            </FocusSelect>
            {/* Custom chevron arrow */}
            <span
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                width: '8px',
                height: '8px',
                borderRight: '1.6px solid #8a7e9a',
                borderBottom: '1.6px solid #8a7e9a',
                transform: 'translateY(-75%) rotate(45deg)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

    </details>
  );
}
