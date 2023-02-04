import React, { useEffect, useRef } from 'react'

type Props = {
  // eslint-disable-next-line no-empty-pattern
  children: React.ReactNode | (({}) => any)
  enabled?: boolean
  events?: string[]
  ignoredElements?: HTMLElement[]
  refProp?: string
  wrapWith?: React.ElementType
  onClickOut: (ev: Event) => any
}

const ClickOutHandler = (props: Props) => {
  const wrapperRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const events = props.events || ['mousedown', 'touchstart']

    events.forEach((event) => {
      document.addEventListener(event, handleClickOut)
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleClickOut)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickOut = (ev: Event) => {
    if (shouldFire(ev)) {
      props.onClickOut(ev)
    }
  }

  const shouldFire = (ev: Event) => {
    return (
      props.enabled !== false &&
      wrapperRef.current &&
      !wrapperRef.current.contains(ev.target as any) &&
      !(props.ignoredElements || []).some((element) => element && element.contains(ev.target as any))
    )
  }

  const { children, refProp = 'ref', wrapWith } = props
  const passRef = (el: HTMLElement) => {
    wrapperRef.current = el
  }

  if (typeof children === 'function') {
    return children({ [refProp]: passRef })
  }

  if (Array.isArray(children) || wrapWith) {
    const Wrapped = wrapWith || 'div'

    return <Wrapped {...{ [refProp]: passRef }}>{children}</Wrapped>
  }

  return React.cloneElement(React.Children.only(children as any), { [refProp]: passRef })
}

export default ClickOutHandler
