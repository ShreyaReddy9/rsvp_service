import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders RSVP heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/rsvp/i);
  expect(headings.length).toBeGreaterThan(0);
});
