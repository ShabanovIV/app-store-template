import { useEffect } from 'react';
import { Button, Card, Form, FormProps, Input, Spin } from 'antd';
import styles from './ProfileForm.module.scss';
import { useProfilePassword } from '../model/useProfilePassword';

interface ProfilePwdFormProps {
  onSuccess?: () => void;
}

type FieldType = {
  password: string;
  newPassword: string;
};

export const ProfilePwdForm: React.FC<ProfilePwdFormProps> = ({ onSuccess }) => {
  const { changePass, contextHolder, isLoading, isSuccess } = useProfilePassword();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    changePass(values.password, values.newPassword);
  };

  return (
    <>
      {contextHolder}
      <Card className={styles.card}>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item<FieldType>
            label="Current Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your current password!' }]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item<FieldType>
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <Spin /> : 'Update Password'}
          </Button>
        </Form>
      </Card>
    </>
  );
};
