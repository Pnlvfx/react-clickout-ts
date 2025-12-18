import { type ReactNode, type RefObject, useEffect, useRef, useState } from 'react';
import { Slot } from './slot';

interface Props {
  readonly children: ReactNode;
  readonly enabled?: boolean;
  readonly events?: string[];
  readonly ignoredElements?: RefObject<HTMLElement | null>[];
  readonly onClickOut?: (ev: Event) => void;
}

export const ClickOutHandler = ({ children, enabled = true, events = ['mousedown', 'touchstart'], ignoredElements = [], onClickOut }: Props) => {
  const [isPageFocused, setIsPageFocused] = useState(true);
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onFocus = () => {
      setIsPageFocused(true);
    };

    const onBlur = () => {
      setIsPageFocused(false);
    };

    globalThis.addEventListener('focus', onFocus);
    globalThis.addEventListener('blur', onBlur);

    return () => {
      globalThis.removeEventListener('focus', onFocus);
      globalThis.removeEventListener('blur', onBlur);
    };
  }, []);

  useEffect(() => {
    const shouldFire = (ev: Event) => {
      return (
        enabled &&
        wrapperRef.current &&
        isPageFocused &&
        !wrapperRef.current.contains(ev.target as HTMLElement) &&
        !ignoredElements.some((elementRef) => elementRef.current?.contains(ev.target as HTMLElement))
      );
    };

    const handleClickOut = (ev: Event) => {
      if (onClickOut && shouldFire(ev)) {
        onClickOut(ev);
      }
    };

    for (const event of events) {
      document.addEventListener(event, handleClickOut);
    }

    return () => {
      for (const event of events) {
        document.removeEventListener(event, handleClickOut);
      }
    };
  }, [events, onClickOut, enabled, ignoredElements, isPageFocused]);

  return <Slot ref={wrapperRef}>{children}</Slot>;
};
