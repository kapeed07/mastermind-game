import { render, screen } from '@testing-library/react';
import App from './App';

test('Game Loads and find Mastermind heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/Master/i);
  expect(linkElement).toBeInTheDocument();
});
