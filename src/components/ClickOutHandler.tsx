import React, { ReactNode, useCallback, useEffect, useRef } from 'react'

type Props = {
  // eslint-disable-next-line no-empty-pattern
  children: ReactNode | (({}) => any)
  enabled?: boolean
  events?: string[]
  ignoredElements?: HTMLElement[]
  onClickOut: (ev: Event) => any
}

const ClickOutHandler = ({
  children,
  enabled = true,
  events = ['mousedown', 'touchstart'],
  ignoredElements = [],
  onClickOut,
}: Props) => {
  const wrapperRef = useRef<HTMLElement | null>(null)

  const shouldFire = useCallback(
    (ev: Event) => {
      return (
        enabled &&
        wrapperRef.current &&
        !wrapperRef.current.contains(ev.target as HTMLElement) &&
        !ignoredElements.some((element) => element && element.contains(ev.target as HTMLElement))
      )
    },
    [enabled, ignoredElements],
  )

  useEffect(() => {
    const handleClickOut = (ev: Event) => {
      if (shouldFire(ev)) {
        onClickOut(ev)
      }
    }
    events.forEach((event) => {
      document.addEventListener(event, handleClickOut)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleClickOut)
      })
    }
  }, [events, onClickOut, shouldFire])

  if (typeof children === 'function') {
    return children({ ref: wrapperRef })
  }

  return React.cloneElement(React.Children.only(children as any), {
    ref: wrapperRef,
  })
}

export default ClickOutHandler
