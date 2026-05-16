import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './hooks/useToast';
import { callGemini } from './lib/gemini';
import { buildPrompt } from './lib/prompt';
import { parseJSONLoose } from './lib/parse';
import Header from './components/Header';
import Composer from './components/Composer';
import ResultsSection from './components/ResultsSection';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';

const TONES = [
  { key: 'flirt',  emoji: '💫', label: '撩一点',  hint: '有点小心思 / 暧昧不越线' },
  { key: 'normal', emoji: '😊', label: '正常',    hint: '自然真诚 / 不油腻' },
  { key: 'cool',   emoji: '🧊', label: '稳一点',  hint: '克制冷静 / 不急不腻' },
];

export default function App() {
  const [msg, setMsg] = useState('');
  const [intent, setIntent] = useState('');
  const [persona, setPersona] = useLocalStorage('persona', '');
  const [length, setLength] = useState('medium');
  const [language, setLanguage] = useState('zh'); // 'zh' | 'en'
  const [image, setImage] = useState(null); // {dataUrl, mimeType, base64} | null
  const [replies, setReplies] = useState(null); // {flirt, normal, cool} | null
  const [refineHistory, setRefineHistory] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [meta, setMeta] = useState(null);
  const { message: toastMsg, visible: toastVisible, show: showToast } = useToast();
  const msgRef = useRef(null);
  const prevLengthRef = useRef(length);

  const generate = useCallback(async ({ refineHint = '', prior = null } = {}) => {
    // 1. Validate: need msg OR intent
    if (!msg.trim() && !intent.trim()) {
      if (msgRef.current) {
        msgRef.current.focus();
        msgRef.current.style.borderColor = '#c97a86'; // r-500
        setTimeout(() => { if (msgRef.current) msgRef.current.style.borderColor = ''; }, 1200);
      }
      return;
    }

    setStatus('loading');
    const t0 = Date.now();

    // 2. Build parts
    const promptText = buildPrompt({ msg, intent, length, language, refineHint, prior });
    const parts = [{ text: promptText }];
    if (image) {
      parts.push({ inline_data: { mime_type: image.mimeType, data: image.base64 } });
    }

    // 3. systemInstruction from background/persona
    const systemInstruction = persona.trim()
      ? `【发消息者的背景与人设】\n${persona.trim()}`
      : undefined;

    try {
      const rawText = await callGemini(parts, systemInstruction);
      const parsed = parseJSONLoose(rawText);
      if (!parsed || !['flirt', 'normal', 'cool'].every(k => k in parsed)) {
        throw new Error('Invalid response format');
      }

      setReplies(parsed);
      setStatus('idle');
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      setMeta(`${elapsed}s · gemini-3.1-flash-lite`);
      if (refineHint) setRefineHistory(h => [...h, refineHint]);
    } catch {
      setStatus('error');
    }
  }, [msg, intent, length, language, image, persona]);

  // Always keep a ref to the latest generate function so the length effect below
  // can call it without needing generate in its own dep array (which would require
  // adding all of generate's deps and risk infinite loops).
  const generateRef = useRef(generate);
  useEffect(() => { generateRef.current = generate; }); // no deps: refresh every render

  // Auto-regenerate when length or language changes, but only if we already have results
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (replies) generateRef.current({ prior: replies });
  }, [length, language]); // intentional: only fire on these changes; ref keeps generate fresh

  const handleCopy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }
    showToast('已复制 · 粘贴去发');
  }, [showToast]);

  const handleRefine = useCallback((refineHint) => {
    generate({ refineHint, prior: replies });
  }, [generate, replies]);

  return (
    <div className="shell">
      <Header />
      <Composer
        msg={msg} onMsgChange={setMsg}
        intent={intent} onIntentChange={setIntent}
        image={image} onImageChange={setImage}
        persona={persona} onPersonaChange={setPersona}
        length={length} onLengthChange={setLength}
        language={language} onLanguageChange={setLanguage}
        loading={status === 'loading'}
        onGenerate={() => generate()}
        hasReplies={!!replies}
        onToast={showToast}
        msgRef={msgRef}
      />
      {/* Show results or empty state */}
      {(status !== 'idle' || replies) ? (
        <ResultsSection
          replies={replies}
          status={status}
          meta={meta}
          refineHistory={refineHistory}
          onRefine={handleRefine}
          tones={TONES}
          onCopy={handleCopy}
        />
      ) : (
        <EmptyState />
      )}
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
