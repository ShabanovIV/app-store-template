import { useEffect, useState } from 'react';
import { Button, Card, Form, FormProps, Input, Space, Spin } from 'antd';
import styles from './ProfileForm.module.scss';
import { useProfile } from '../model/useProfile';
import { useProfileUpdate } from '../model/useProfileUpdate';

interface ProfileFormProps {
  onSuccess?: () => void;
}

type FieldType = {
  name: string;
  email: string;
  signUpDate: Date;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSuccess }) => {
  const [isChanges, setIsChanges] = useState(false);
  const { data } = useProfile();
  const { update, isLoading, isSuccess } = useProfileUpdate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  useEffect(() => {
    if (isSuccess) {
      setIsChanges(false);
    }
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const handleChange = () => {
    setIsChanges(true);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    update(values.name);
  };

  return (
    <Card className={styles.card}>
      <Form form={form} name="ProfileForm" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item<FieldType>
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input onChange={handleChange} placeholder="John Doe" />
        </Form.Item>

        <Form.Item<FieldType> label="Email" name="email">
          <Input readOnly />
        </Form.Item>

        <Form.Item<FieldType> label="Date of Registration" name="signUpDate">
          <Input readOnly />
        </Form.Item>

        <Space className={styles.actions}>
          <Button type="primary" htmlType="submit" disabled={isLoading || !isChanges}>
            {isLoading ? <Spin /> : 'Save'}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};
