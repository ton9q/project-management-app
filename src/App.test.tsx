import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders component', () => {
    render(<App />);

    expect(screen.getByText(/Project Management/i)).toBeInTheDocument();
  });
});
