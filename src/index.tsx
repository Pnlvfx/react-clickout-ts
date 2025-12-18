import { type ReactElement, type ReactNode, type RefObject, useCallback, useEffect, useRef } from 'react';
import { Slot } from './slot';

interface RenderProps {
  ref: RefObject<HTMLElement | null>;
}

interface Props {
  readonly children: ReactNode | ((props: RenderProps) => ReactElement);
  readonly enabled?: boolean;
  readonly events?: string[];
  readonly ignoredElements?: RefObject<HTMLElement | null>[];
  readonly onClickOut?: (ev: Event) => void;
}

export const ClickOutHandler = ({ children, enabled = true, events = ['mousedown', 'touchstart'], ignoredElements = [], onClickOut }: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);

  const shouldFire = useCallback(
    (ev: Event) => {
      return (
        enabled &&
        document.hasFocus() &&
        wrapperRef.current &&
        !wrapperRef.current.contains(ev.target as HTMLElement) &&
        !ignoredElements.some((elementRef) => elementRef.current?.contains(ev.target as HTMLElement))
      );
    },
    [enabled, ignoredElements],
  );

  useEffect(() => {
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
  }, [events, onClickOut, shouldFire]);

  if (typeof children === 'function') {
    // eslint-disable-next-line react-hooks/refs
    return children({ ref: wrapperRef });
  }

  return <Slot ref={wrapperRef}>{children}</Slot>;
};
