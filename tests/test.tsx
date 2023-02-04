import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { ClickOutHandler } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <ClickOutHandler onClickOut={(e) => console.log(e)}>
        <div></div>
      </ClickOutHandler>,
    )
  })
})
