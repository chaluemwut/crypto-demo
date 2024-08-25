import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../src/app/login/page'
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
describe('Login', () => {
  it('testing text', () => {
    const screen = render(<Login />)
    const heading = screen.getByText(/Sign in to your account/i)
    expect(heading).toBeInTheDocument()
  })
})