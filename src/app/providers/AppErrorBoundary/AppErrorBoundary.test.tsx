import { render, screen, fireEvent } from '@testing-library/react';
import { AppErrorBoundary } from './AppErrorBoundary';

// Компонент, который выбрасывает ошибку только один раз
const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

describe('AppErrorBoundary', () => {
  it('renders fallback UI with error message when an error is thrown', () => {
    render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    // Проверяем, что отображается fallback UI с текстом ошибки
    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
  });

  it('resets error state when retry button is clicked', () => {
    const { rerender } = render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    // Проверяем, что отображается fallback UI
    expect(screen.getByText('Что-то пошло не так.')).toBeInTheDocument();

    // Используем rerender для обновления дочернего компонента
    rerender(
      <AppErrorBoundary>
        <div>No errors here!</div>
      </AppErrorBoundary>,
    );

    // Нажимаем кнопку "Попробовать снова"
    fireEvent.click(screen.getByText('Попробовать снова'));

    // Проверяем, что fallback UI больше не отображается
    expect(screen.queryByText('Что-то пошло не так.')).not.toBeInTheDocument();

    // Проверяем, что отображается нормальное содержимое
    expect(screen.getByText('No errors here!')).toBeInTheDocument();
  });

  it('logs the error in componentDidCatch', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <AppErrorBoundary>
        <ErrorThrowingComponent />
      </AppErrorBoundary>,
    );

    // Проверяем, что ошибка логируется
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
