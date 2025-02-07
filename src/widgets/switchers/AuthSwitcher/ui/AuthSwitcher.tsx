import { useState } from 'react';
import { Button, Space, Typography, Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignInForm } from 'src/features/forms/SignInForm';
import { SignUpForm } from 'src/features/forms/SignUpForm';
import styles from './AuthSwitcher.module.scss';

const { Text } = Typography;

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
    <div className={styles.authCard}>
      <h4 className={styles.title}>
        {isSignIn ? 'Log in to your account' : 'Enter your email and create a password'}
      </h4>

      <Divider />

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
    </div>
  );
};
