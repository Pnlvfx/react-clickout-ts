import { type RefObject, useEffect } from 'react';

export interface ClickOutsideParams {
  enabled?: boolean;
  ignoredElements?: RefObject<HTMLElement | null>[];
  onClickOut?: (event: Event) => void;
}

export const useClickOutside = (ref: RefObject<HTMLElement | null>, { enabled = true, ignoredElements = [], onClickOut }: ClickOutsideParams) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target || ref.current?.contains(target)) return;
      if (ignoredElements.some((ignored) => ignored.current?.contains(target))) return;

      onClickOut?.(event);
    };

    const types = ['click', 'touchstart'];

    for (const type of types) {
      document.addEventListener(type, handler);
    }

    return () => {
      for (const type of types) {
        document.removeEventListener(type, handler);
      }
    };
  }, [enabled, ignoredElements, onClickOut, ref]);
};
