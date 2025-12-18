import { type ReactNode, type RefObject, useRef } from 'react';
import { useClickOutside } from './hook';
import { Slot } from './slot';

export interface ClickOutProps {
  readonly children: ReactNode;
  readonly enabled?: boolean;
  readonly events?: string[];
  readonly ignoredElements?: RefObject<HTMLElement | null>[];
  readonly onClickOut?: (ev: Event) => void;
}

export const ClickOutHandler = ({ children, enabled = true, ignoredElements = [], onClickOut }: ClickOutProps) => {
  const wrapperRef = useRef<HTMLElement>(null);

  useClickOutside(wrapperRef, { enabled, ignoredElements, onClickOut });

  return <Slot ref={wrapperRef}>{children}</Slot>;
};
