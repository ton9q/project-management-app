import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('App', () => {
  it('renders component', () => {
    render(<App />);

    expect(screen.getByText(/Kanban/i)).toBeInTheDocument();
  });
});
