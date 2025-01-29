import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from 'antd';
import { isMessage, isServerErrors, joinErrors } from 'src/shared/api/errors';
import styles from './AppErrorBoundary.module.scss';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: unknown): AppErrorBoundaryState {
    if (isServerErrors(error)) {
      return { hasError: true, error: new Error(joinErrors(error)) };
    } else if (isMessage(error)) {
      return { hasError: true, error: new Error(error.message) };
    }

    return { hasError: true, error: new Error('Unknown error.') };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <Button onClick={this.handleRetry}>Try again</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
