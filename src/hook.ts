import { type RefObject, useEffect, useRef } from 'react';

export interface ClickOutsideParams {
  enabled?: boolean;
  ignoredElements?: RefObject<HTMLElement | null>[];
  onClickOut?: (event: Event) => void;
}

export function useClickOutside(ref: RefObject<HTMLElement | null>, { enabled = true, ignoredElements = [], onClickOut }: ClickOutsideParams) {
  const ignoreNextPointerRef = useRef(false);

  useEffect(() => {
    const handleBlur = () => {
      ignoreNextPointerRef.current = true;
    };

    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (ignoreNextPointerRef.current) {
        ignoreNextPointerRef.current = false;
        return;
      }

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const el = ref.current;
      if (!el) return;

      if (el.contains(target)) return;

      if (ignoredElements.some((ignored) => ignored.current?.contains(target))) {
        return;
      }

      onClickOut?.(event);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [enabled, ignoredElements, onClickOut, ref]);
}
