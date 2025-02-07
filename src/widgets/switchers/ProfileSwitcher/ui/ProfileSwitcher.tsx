import { useState } from 'react';
import { Button, Space, Typography, Divider } from 'antd';
import { ProfileForm } from 'src/features/forms/ProfileForm';
import { ProfilePwdForm } from 'src/features/forms/ProfilePwdForm';
import styles from './ProfileSwitcher.module.scss';

const { Text } = Typography;

export const ProfileSwitcher: React.FC = () => {
  const [isProfile, setIsProfile] = useState(true);

  const handleClick = () => {
    setIsProfile((prev) => !prev);
  };

  return (
    <div className={styles.profileCard}>
      <h4 className={styles.title}>{isProfile ? 'Personal data' : 'Password change'}</h4>

      {isProfile ? <ProfileForm /> : <ProfilePwdForm />}

      <Divider />

      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <Text type="secondary">{isProfile ? 'Want to change your password?' : ''}</Text>
        <Button type="link" onClick={handleClick}>
          {isProfile ? 'Password change' : 'Back to Profile'}
        </Button>
      </Space>
    </div>
  );
};
