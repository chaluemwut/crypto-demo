import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Registration from '../src/app/registration/page'
import { describe } from 'node:test';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));
describe('Registration', () => {
  it('testing text', () => {
    const screen = render(<Registration />)
    const heading = screen.getByText(/Create account/i)
    expect(heading).toBeInTheDocument()
  })
})