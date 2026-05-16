import { useRef, useState } from 'react';

const CHIPS = ['再含蓄一点', '加点幽默感', '别用感叹号和颜文字', '更口语化', '再短一点'];

function EditSVG() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a05bd6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

export default function RefineBar({ onRefine, disabled, hasReplies }) {
  const [inputValue, setInputValue] = useState('');
  const [sendHovered, setSendHovered] = useState(false);
  const inputRef = useRef(null);

  function handleSend() {
    const val = inputValue.trim();
    if (!val || disabled) return;
    onRefine(val);
    setInputValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleChipClick(chip) {
    if (disabled) return;
    if (hasReplies) {
      onRefine(chip);
    } else {
      setInputValue(chip);
      inputRef.current?.focus();
    }
  }

  const sendStyle = {
    background: 'linear-gradient(135deg, #b46cff 0%, #f55c93 100%)',
    color: '#ffffff',
    border: 0,
    borderRadius: '10px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    font: 'inherit',
    transition: 'filter .15s, transform .15s',
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
    ...(sendHovered && !disabled
      ? { filter: 'brightness(1.05)', transform: 'translateY(-1px)' }
      : { filter: 'none', transform: 'translateY(0)' }),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {/* Input bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#ffffff',
          border: '1px solid #ece6f3',
          borderRadius: '14px',
          padding: '8px 8px 8px 14px',
          boxShadow: '0 1px 2px rgba(74,40,120,.04), 0 2px 8px rgba(74,40,120,.05)',
        }}
      >
        <EditSVG />
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="想再润色一下？例：再含蓄点 / 加点幽默 / 别用感叹号"
          style={{
            flex: 1,
            border: 0,
            outline: 0,
            background: 'transparent',
            font: 'inherit',
            color: '#1d1726',
            padding: '6px 0',
            fontSize: '14px',
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          style={sendStyle}
          onMouseEnter={() => setSendHovered(true)}
          onMouseLeave={() => setSendHovered(false)}
        >
          润色
        </button>
      </div>

      {/* Chip row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {CHIPS.map((chip) => (
          <ChipButton
            key={chip}
            label={chip}
            disabled={disabled}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>
    </div>
  );
}

function ChipButton({ label, disabled, onClick }) {
  const [hovered, setHovered] = useState(false);

  const style = {
    border: hovered && !disabled ? '1px solid #d6abe9' : '1px solid #ece6f3',
    background: hovered && !disabled ? '#fbf5fd' : '#ffffff',
    color: hovered && !disabled ? '#8a3fc4' : '#4a3f5b',
    borderRadius: '9999px',
    padding: '5px 10px',
    font: 'inherit',
    fontSize: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'border-color .15s, color .15s, background .15s',
  };

  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  );
}
