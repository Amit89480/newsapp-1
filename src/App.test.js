import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react Nava', () => {
  render(<App />);
  const NavaElement = screen.getByText(/learn react/i);
  expect(NavaElement).toBeInTheDocument();
});
