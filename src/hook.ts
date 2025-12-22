import { type RefObject, useEffect } from 'react';

export interface ClickOutsideParams {
  enabled?: boolean;
  ignoredElements?: RefObject<HTMLElement | null>[];
  onClickOut?: (event: Event) => void;
}

export const useClickOutside = (ref: RefObject<HTMLElement | null>, { enabled = true, ignoredElements = [], onClickOut }: ClickOutsideParams) => {
  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
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
};
