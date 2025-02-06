import { render, screen, fireEvent } from '@testing-library/react';
import { AppErrorBoundary } from './AppErrorBoundary';

const title = 'Test error';
const titleButton = 'Try again';

const ErrorThrowingComponent = () => {
  throw new Error(title);
};

describe('AppErrorBoundary', () => {
  it('renders fallback UI with error message when an error is thrown', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(titleButton)).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('resets error state when retry button is clicked', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();

    rerender(
      <AppErrorBoundary>
        <div>No errors here!</div>
      </AppErrorBoundary>,
    );

    fireEvent.click(screen.getByText(titleButton));

    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.getByText('No errors here!')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('logs the error in componentDidCatch', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'AppErrorBoundary caught an error:',
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );

    consoleErrorSpy.mockRestore();
  });
});
