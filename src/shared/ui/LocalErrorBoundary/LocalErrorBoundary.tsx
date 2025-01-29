import { Component, ReactNode } from 'react';
import { Alert } from 'antd';
import {
  ErrorCode,
  includeCode as includeCodes,
  isServerErrors,
  joinErrors,
} from 'src/shared/api/errors';
import styles from './LocalErrorBoundary.module.scss';

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

  static getDerivedStateFromError(error: unknown): LocalErrorBoundaryState {
    const codesLocal: ErrorCode[] = Object.values(ErrorCode).filter(
      (code) => code !== ErrorCode.ERR_INTERNAL_SERVER,
    );

    if (isServerErrors(error) && !includeCodes(error, codesLocal)) {
      throw error;
    }

    const message = isServerErrors(error) ? joinErrors(error) : 'Unknown error.';

    return { hasError: true, error: new Error(message) };
  }

  handleDismiss = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    return (
      <div className={styles.errorWrapper}>
        {this.state.hasError && (
          <Alert
            className={styles.errorAlert}
            closable
            onClose={this.handleDismiss}
            type="error"
            message={this.state.error?.message || 'Unknown error.'}
            showIcon
          />
        )}
        {this.props.children}
      </div>
    );
  }
}
