import { render, screen, fireEvent } from '@testing-library/react';
import { AppErrorBoundary } from './AppErrorBoundary';

const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

describe('AppErrorBoundary', () => {
  it('renders fallback UI with error message when an error is thrown', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('resets error state when retry button is clicked', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();

    rerender(
      <AppErrorBoundary>
        <div>No errors here!</div>
      </AppErrorBoundary>,
    );

    fireEvent.click(screen.getByText('Попробовать снова'));

    expect(screen.queryByText('Что-то пошло не так.')).not.toBeInTheDocument();
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
