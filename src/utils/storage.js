/**
 * localStorage helpers that never throw.
 *
 * Reading straight into a useState initializer means corrupt JSON, a private
 * window, or blocked site data takes the whole page down with it. These return
 * a fallback instead.
 */

export const readStored = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const writeStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Quota exceeded or storage blocked — the in-memory state still updates.
    return false;
  }
};
