import { useState, useRef } from 'react';

export function useToast(duration = 1800) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const show = (text) => {
    setMessage(text);
    setVisible(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), duration);
  };

  return { message, visible, show };
}
