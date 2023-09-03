import '@testing-library/jest-dom'

import type ReactDOM from 'react-dom'

import { render, screen } from '@testing-library/react'

import Home from '~/app/page'

jest.mock('react-dom', () => ({
  ...jest.requireActual<typeof ReactDOM>('react-dom'),
  preload: jest.fn(),
}))

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading: HTMLElement = screen.getByRole('heading', {
      name: /Tetris/i,
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
