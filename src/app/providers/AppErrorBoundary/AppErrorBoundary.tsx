import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { isMessage, isServerErrors } from 'src/shared/api/errors/errorGuards';
import { joinErrors } from 'src/shared/api/errors/errorParser';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          subTitle={isMessage(this.state.error) ? this.state.error.message : 'Unknown error'}
          extra={
            <Button onClick={this.handleRetry} type="primary">
              Try again
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}
