import { useState } from 'react';
import { Button, Card, Space, Typography, Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignInForm } from 'src/features/SignInForm';
import { SignUpForm } from 'src/features/SignUpForm';
import { LocalErrorBoundary } from 'src/shared/ui/LocalErrorBoundary/LocalErrorBoundary';
import styles from './AuthSwitcher.module.scss';

const { Title, Text } = Typography;

export const AuthSwitcher: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleSuccess = () => {
    const from = location.state?.from || '/';
    navigate(from, { replace: true });
  };

  return (
    <Space direction="vertical" align="center" className={styles.container}>
      <LocalErrorBoundary key={isSignIn ? 'signin_err_boundary' : 'signup_err_boundary'}>
        <Card className={styles.authCard}>
          <Title level={3} className={styles.title}>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Title>

          {isSignIn ? (
            <SignInForm onSuccess={handleSuccess} />
          ) : (
            <SignUpForm onSuccess={handleSuccess} />
          )}

          <Divider />

          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Text type="secondary">
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <Button type="link" onClick={handleClick}>
              {isSignIn ? 'Join' : 'Sign In'}
            </Button>
          </Space>
        </Card>
      </LocalErrorBoundary>
    </Space>
  );
};
