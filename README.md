# react-clickout-ts


A React component to handle clicking outside of an element.

[![travis build](https://img.shields.io/travis/k2p-ed/react-clickout-handler.svg?style=flat-square)](https://travis-ci.org/k2p-ed/react-clickout-handler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

### Features

- Wrap a single element or multiple elements to watch for clickout behavior
- Ignore one or more elements (clickout behavior won't be triggered) by adding them to the `ignoredElements` prop
- Enable or disable the clickout behavior on the fly with the `enabled` prop

### Installation

```sh
  yarn add react-clickout-ts
```

or

```sh
  npm install --save react-clickout-ts
```

BREAKING CHANGES: V 1.2.2

- Replace import ClickOutHandler from "react-clickout-ts" with import { ClickOutHandler } from "react-clickout-ts";

### Getting Started

```js
import React from 'react'
import { ClickOutHandler } from 'react-clickout-ts'

const MyComponent = () => {
  const handleClickOut = () => {
    console.log('clicked out!')
  }

  return (
    <ClickOutHandler onClickOut={handleClickOut}>
      <div className='modal'>This is a modal! Click outside to close it.</div>
    </ClickOutHandler>
  )
}
```

### Props

| Prop | Type | Required | Default | Description |
|-------------------|----------------------------------------------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `children` | `Node | ({ [string]: Ref }) => any` | true |  | The element(s) you want to trigger the `onClickOut` callback when clicked outside of |
| `enabled` | `boolean` | false | `true` | Enables or disables the clickout behavior. This can be useful to ensure the `onClickOut` callback is only executed when you want it to be. |
| `events` | `string[]` | false | `['mousedown', 'touchstart']` | Allows for specifying custom events to trigger the `onClickOut` callback |
| `ignoredElements` | `Object[]` | false | `[]` | An array of refs for elements to exclude from triggering the clickout behavior |
| `refProp` | `string` | false | `ref` | Specify a prop name to use for getting a ref to the wrapped component. Useful if you need to get the ref for a "composed" component, or if you're using something like [styled-components](https://www.styled-components.com/), which requires use of `innerRef` to get the ref of a styled component. |
| `wrapWith` | `ElementType` | false | `null` | Specify what type of element to wrap the children with. Can be a React component or string such as `div`.  If this prop is not provided, the `ClickOutHandler` component will either clone the child element (if single child) or wrap the children in a `div` (if multiple children). |
| `onClickOut` | `(ev: Event) => any` | true |  | Function to be called when the clickout behavior is triggered. Receives the click event as an argument. |

### Examples

#### Excluding element(s)

If there are any elements outside of your ClickOutHandler component that you do not want to trigger the clickout behavior when clicked, you can pass a ref to the `ignoredElements` prop.

```js
import { useRef, useState } from 'react'
import { ClickOutHandler } from 'react-clickout-ts'

const Component = () => {
  const ignoreRef = useRef < HTMLElement > null
  const handleClickOutside = (ev: Event) => {
    console.log('Clicked outside')
  }

  return (
    <ClickOutHandler ignoredElements={[ignoreRef.current]} onClickOut={handleClickOutside}>
      <div>
        Content goes here
        <div ref={ignoreRef}>This should be ignored</div>
      </div>
    </ClickOutHandler>
  )
}

export default Component
```

### License

MIT
