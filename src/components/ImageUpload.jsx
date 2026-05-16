import { useRef, useState, useEffect } from 'react';
import { MAX_IMAGE_BYTES } from '../lib/image';

export default function ImageUpload({ image, onImageChange, onToast }) {
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef(null);

  // Read file as data URL, then extract base64 + mimeType for the image data object
  function getDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  async function processFileFull(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > MAX_IMAGE_BYTES) {
      onToast('图片过大，请压缩后上传');
      return;
    }
    const dataUrl = await getDataUrl(file);
    const comma = dataUrl.indexOf(',');
    const base64 = comma >= 0 ? dataUrl.slice(comma + 1) : '';
    onImageChange({ dataUrl, mimeType: file.type || 'image/jpeg', base64 });
  }

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    processFileFull(file);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFileFull(file);
  }

  function handleRemove(e) {
    e.stopPropagation();
    onImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  useEffect(() => {
    function handlePaste(event) {
      const items = event.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          processFileFull(file);
          break;
        }
      }
    }

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (image) {
    return (
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          minHeight: '132px',
        }}
      >
        <img
          src={image.dataUrl}
          alt="uploaded"
          className="w-full h-[132px] object-cover block"
          style={{ borderRadius: '16px' }}
        />
        <button
          onClick={handleRemove}
          aria-label="移除图片"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '24px',
            height: '24px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(29,23,38,.65)',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      </div>
    );
  }

  const borderColor = dragging ? '#a05bd6' : hovered ? '#d6abe9' : '#e3d2f0';
  const bgStyle = dragging
    ? { background: 'var(--grad-primary-soft)' }
    : { background: 'linear-gradient(180deg, #fdfaff, #faf4ff)' };
  const scaleStyle = dragging ? { transform: 'scale(1.01)' } : {};

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '132px',
        border: `1.5px dashed ${borderColor}`,
        borderRadius: '16px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .15s ease, transform .15s ease',
        ...bgStyle,
        ...scaleStyle,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {/* Icon box */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 2px rgba(74,40,120,.04), 0 2px 8px rgba(74,40,120,.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a05bd6',
          marginBottom: '8px',
          flexShrink: 0,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M3 16l4-4 4 4 3-3 7 7" />
          <circle cx="9" cy="9" r="1.5" />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          color: '#4a3f5b',
          fontSize: '12px',
          fontWeight: 500,
          marginBottom: '2px',
        }}
      >
        拖入图片
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: '#8a7e9a',
          fontSize: '12px',
        }}
      >
        或点击上传
      </div>
    </label>
  );
}
