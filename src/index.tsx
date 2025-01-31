import { Children, type ReactElement, type ReactNode, RefObject, cloneElement, isValidElement, useCallback, useEffect, useRef } from 'react';

interface RenderProps {
  ref: React.RefObject<HTMLElement | null>;
}

interface Props {
  children: ReactNode | ((props: RenderProps) => ReactElement);
  enabled?: boolean;
  events?: string[];
  ignoredElements?: HTMLElement[];
  onClickOut: (ev: Event) => void;
}

// eslint-disable-next-line sonarjs/function-return-type
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

  if (!isValidElement(children)) {
    if (process.env['NODE_ENV'] === 'development') throw new Error('Invalid element passed to ClickoutHandler');
    return children;
  }

  return cloneElement(Children.only(children) as ReactElement<{ ref?: RefObject<HTMLElement | null> }>, {
    ref: wrapperRef,
  });
};
