import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactNode, type Ref } from 'react';

// copied from @coraline-ui/slot

interface SlotProps extends HTMLAttributes<HTMLElement> {
  readonly children?: ReactNode;
  readonly ref?: Ref<HTMLElement | null>;
}

// eslint-disable-next-line sonarjs/function-return-type
export const Slot = ({ children, ...props }: SlotProps) => {
  if (!isValidElement(children)) {
    // eslint-disable-next-line no-restricted-properties
    if (process.env['NODE_ENV'] !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('Slot expects a single React element as a child.');
    }

    return children;
  }

  return cloneElement(Children.only(children), props);
};
