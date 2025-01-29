import { SignInForm } from 'src/features/SignInForm';
import { LocalErrorBoundary } from 'src/shared/ui/LocalErrorBoundary/LocalErrorBoundary';

export const AuthPage: React.FC = () => {
  return (
    <LocalErrorBoundary>
      <SignInForm />
    </LocalErrorBoundary>
  );
};
