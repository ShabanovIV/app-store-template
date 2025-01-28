import { Component, ReactNode } from 'react';
import {
  ErrorCode,
  includeCode as includeCodes,
  isServerErrors,
  joinErrors,
} from 'src/shared/api/errors';

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
    const codes: ErrorCode[] = [
      ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD,
      ErrorCode.ERR_ACCOUNT_ALREADY_EXIST,
      ErrorCode.ERR_AUTH,
    ];

    if (isServerErrors(error) && !includeCodes(error, codes)) {
      throw new Error(joinErrors(error));
    }

    const message = isServerErrors(error) ? joinErrors(error) : 'Unknown error.';

    return { hasError: true, error: new Error(message) };
  }

  handleDismiss = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>{this.state.error?.message || 'Unknown error.'}</p>
          <button onClick={this.handleDismiss}>Закрыть</button>
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }
}
