import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorCode, isServerErrors } from 'src/shared/api/errors';

interface LocalErrorBoundaryProps {
  children: ReactNode;
}

interface LocalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class LocalErrorBoundary extends Component<
  LocalErrorBoundaryProps,
  LocalErrorBoundaryState
> {
  state: LocalErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): LocalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in LocalErrorBoundary:', error, errorInfo);

    // Проверяем, является ли ошибка ServerErrors с кодом ERR_INTERNAL_SERVER
    if (this.isServerErrorWithInternalCode(error)) {
      throw error; // Передаём ошибку выше
    }

    // Если это не ServerErrors, или код ошибки не соответствует, обрабатываем локально
  }

  private isServerErrorWithInternalCode(error: unknown): boolean {
    if (isServerErrors(error)) {
      return error.errors.some((err) => err.extensions.code === ErrorCode.ERR_INTERNAL_SERVER);
    }
    return false;
  }

  handleDismiss = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>{this.state.error?.message || 'Произошла ошибка'}</p>
          <button onClick={this.handleDismiss}>Закрыть</button>
        </div>
      );
    }

    return this.props.children;
  }
}
