import { useState, useEffect } from 'react';

/**
 * Minimal toast system, used in place of window.alert().
 *
 * alert() blocks the main thread, cannot be styled, and reads as a browser
 * error rather than app feedback. This renders an aria-live region instead, so
 * screen readers announce the message without stealing focus.
 */

let listener = null;
let nextId = 0;

// The emitter ships alongside its renderer so callers have a single import.
// Only costs a full reload instead of a hot update when this file is edited.
// eslint-disable-next-line react-refresh/only-export-components
export const toast = (message, tone = 'info') => {
  if (!message || !listener) return;
  listener({ id: nextId++, message: String(message), tone });
};

export const Toaster = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    listener = (item) => {
      setItems((prev) => [...prev, item]);
      setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== item.id));
      }, 3200);
    };
    return () => {
      listener = null;
    };
  }, []);

  return (
    <div className="toaster" role="status" aria-live="polite">
      {items.map(({ id, message, tone }) => (
        <div key={id} className={`toast toast-${tone}`}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
