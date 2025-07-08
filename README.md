# react-clickout-ts

A React component to handle click-outside behavior for elements. Perfect for modals, dropdowns, and other overlay components.

[![npm version](https://img.shields.io/npm/v/react-clickout-ts.svg?style=flat-square)](https://www.npmjs.com/package/react-clickout-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

### Features

### Features

- TypeScript-first implementation
- Handle click outside for single or multiple elements
- Ignore specific elements from triggering click-out
- Customizable event triggers
- Zero dependencies

### Installation

```sh
yarn add react-clickout-ts
```

or

```sh
npm install --save react-clickout-ts
```

### Getting Started

```js
import React from 'react';
import { ClickOutHandler } from 'react-clickout-ts';

const Modal = () => {
  const handleClickOut = () => {
    console.log('Close modal!');
  };

  return (
    <ClickOutHandler onClickOut={handleClickOut}>
      <div className="modal">This is a modal! Click outside to close it.</div>
    </ClickOutHandler>
  );
};
```

### Props

**`children`** (required)

- Type: `ReactNode`
- The element(s) you want to trigger the `onClickOut` callback when clicked outside of

**`enabled`**

- Type: `boolean`
- Default: `true`
- Enables or disables the clickout behavior

**`events`**

- Type: `string[]`
- Default: `['mousedown', 'touchstart']`
- Custom events to trigger the `onClickOut` callback

**`ignoredElements`**

- Type: `RefObject<HTMLElement | null>[]`
- Default: `[]`
- Array of refs for elements to exclude from triggering clickout behavior

**`onClickOut`**

- Type: `(ev: Event) => void`
- Function called when clickout behavior is triggered. Receives the click event as an argument. |

### Examples

#### Excluding element(s)

If there are any elements outside of your ClickOutHandler component that you do not want to trigger the clickout behavior when clicked, you can pass a ref to the `ignoredElements` prop.

```js
import { useRef, useState } from 'react'
import { ClickOutHandler } from 'react-clickout-ts'

const Component = () => {
  const ignoreRef = useRef<HTMLElement>(null)

  const handleClickOutside = (ev: Event) => {
    console.log('Clicked outside')
  }

  return (
    <div>
      <div ref={ignoreRef}>This should be ignored!</div>
      <ClickOutHandler ignoredElements={[ignoreRef]} onClickOut={handleClickOutside}>
        <div>Content goes here</div>
      </ClickOutHandler>
    </div>
  )
}
```

### License

MIT
