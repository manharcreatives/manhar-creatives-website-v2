import { useEffect, useState, useRef, useCallback, Suspense, lazy } from 'react';

/* ═══════════════════════════════════════════════════════════
   KEYBOARD SHORTCUTS — listener

   A small set, deliberately. Shortcuts only earn their keep when
   a visitor can remember them, and nobody memorises fourteen
   bindings on an agency site.

     /            focus the blog search
     ?            open the shortcuts panel
     Esc          close whatever is open
     Ctrl/⌘ + K   focus search, or open the panel elsewhere

   The `/` and ⌘K handlers dispatch a `mc:focus-search` event
   rather than reaching into the blog page directly, so the page
   stays in charge of its own DOM and this component does not
   need to know whether a search field exists. A listener that
   calls preventDefault has claimed the key.

   Only this listener ships in the main bundle. The dialog itself
   is a separate chunk fetched the first time someone actually
   asks for it — most visitors never press "?".
   ═══════════════════════════════════════════════════════════ */

const ShortcutsPanel = lazy(() => import('./ShortcutsPanel'));

export const FOCUS_SEARCH_EVENT = 'mc:focus-search';

/** True when the visitor is mid-sentence in a field — shortcuts must not steal those keys. */
function isTyping(target) {
  if (!target) return false;
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable === true
  );
}

export default function KeyboardShortcuts() {
  /* `armed` stays false until the first relevant keypress, which
     is what keeps the panel chunk off the critical path. */
  const [armed, setArmed] = useState(false);
  const [open, setOpen] = useState(false);
  const returnFocusTo = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    /* Hand focus back where it was, or the panel's disappearance
       drops the caret at the top of the document. */
    const el = returnFocusTo.current;
    if (el && typeof el.focus === 'function') {
      requestAnimationFrame(() => el.focus());
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const typing = isTyping(e.target);
      const meta = e.metaKey || e.ctrlKey;

      if (meta && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        const unclaimed = document.dispatchEvent(
          new CustomEvent(FOCUS_SEARCH_EVENT, { cancelable: true })
        );
        if (unclaimed) {
          returnFocusTo.current = document.activeElement;
          setArmed(true);
          setOpen(true);
        }
        return;
      }

      if (typing) return;

      if (e.key === '/') {
        const unclaimed = document.dispatchEvent(
          new CustomEvent(FOCUS_SEARCH_EVENT, { cancelable: true })
        );
        if (!unclaimed) e.preventDefault();
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        returnFocusTo.current = document.activeElement;
        setArmed(true);
        setOpen((o) => !o);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  if (!armed) return null;

  return (
    <Suspense fallback={null}>
      <ShortcutsPanel open={open} onClose={close} />
    </Suspense>
  );
}
