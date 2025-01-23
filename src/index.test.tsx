import { render } from '@testing-library/react';
import App from './app/App';

test('renders App component and applies styles correctly', () => {
  const { container } = render(<App />);

  const appElement = container.firstChild;
  expect(appElement).not.toBeNull();
  expect(appElement).not.toBeUndefined();
  expect(appElement).toBeInTheDocument();
  expect(appElement).toHaveClass('container');
});
