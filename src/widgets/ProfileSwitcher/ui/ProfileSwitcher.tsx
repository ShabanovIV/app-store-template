import { useState } from 'react';
import { Button, Card, Space, Typography, Divider } from 'antd';
import { ProfileForm, ProfilePwdForm } from 'src/features/Profile';
import { LocalErrorBoundary } from 'src/shared/ui/LocalErrorBoundary/LocalErrorBoundary';
import styles from './ProfileSwitcher.module.scss';

const { Title, Text } = Typography;

export const ProfileSwitcher: React.FC = () => {
  const [isProfile, setIsProfile] = useState(true);

  const handleClick = () => {
    setIsProfile((prev) => !prev);
  };

  return (
    <Space direction="vertical" align="center" className={styles.container}>
      <LocalErrorBoundary key={isProfile ? 'profile_err_boundary' : 'password_err_boundary'}>
        <Card className={styles.profileCard}>
          <Title level={3} className={styles.title}>
            {isProfile ? 'Profile' : 'Change Password'}
          </Title>

          {isProfile ? <ProfileForm /> : <ProfilePwdForm />}

          <Divider />

          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Text type="secondary">{isProfile ? 'Want to change your password?' : ''}</Text>
            <Button type="link" onClick={handleClick}>
              {isProfile ? 'Change Password' : 'Back to Profile'}
            </Button>
          </Space>
        </Card>
      </LocalErrorBoundary>
    </Space>
  );
};
