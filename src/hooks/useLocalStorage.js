import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setAndStore = (newValue) => {
    setValue(newValue);
    try { localStorage.setItem(key, JSON.stringify(newValue)); } catch {}
  };

  return [value, setAndStore];
}
