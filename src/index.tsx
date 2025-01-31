import { Children, type ReactNode, cloneElement, useCallback, useEffect, useRef } from 'react';

interface Props {
  // eslint-disable-next-line no-empty-pattern
  children: ReactNode | (({}) => unknown);
  enabled?: boolean;
  events?: string[];
  ignoredElements?: HTMLElement[];
  onClickOut: (ev: Event) => void;
}

export const ClickOutHandler = ({ children, enabled = true, events = ['mousedown', 'touchstart'], ignoredElements = [], onClickOut }: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);

  const shouldFire = useCallback(
    (ev: Event) => {
      return (
        enabled &&
        wrapperRef.current &&
        !wrapperRef.current.contains(ev.target as HTMLElement) &&
        !ignoredElements.some((element) => element.contains(ev.target as HTMLElement))
      );
    },
    [enabled, ignoredElements],
  );

  useEffect(() => {
    const handleClickOut = (ev: Event) => {
      if (shouldFire(ev)) {
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
  }, [events, onClickOut, shouldFire]);

  if (typeof children === 'function') {
    return children({ ref: wrapperRef });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  return cloneElement(Children.only(children as any), {
    ref: wrapperRef,
  });
};
