import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Card } from './Card'

describe('Card', () => {
  test('loads and displays card', async () => {
    render(
      <Card href="HREF_TEST" title="TITLE_TEST">
        CHILDREN_TEST
      </Card>,
    )

    expect(screen.getByRole('link')).toHaveTextContent('CHILDREN_TEST')
    expect(screen.getByRole('link')).toHaveTextContent('TITLE_TEST')
    expect(screen.getByRole('link')).toHaveAttribute('href', 'HREF_TEST')
  })
})
