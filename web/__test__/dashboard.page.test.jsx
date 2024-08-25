import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from '../src/app/dashboard/page'
import { describe } from 'node:test';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    replace: jest.fn(),
    isFallback: false,
  }),
}));
describe('Dashboard', () => {
  it('testing text', () => {
    const screen = render(<Dashboard />)
    const heading = screen.getByText(/Address/i)
    expect(heading).toBeInTheDocument()
  })
})