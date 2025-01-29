import { useEffect } from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { useSignUp } from '../model/useSignUp';

interface SignUpFormProps {
  onSuccess: () => void;
}

type FieldType = {
  email?: string;
  password?: string;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const { signUp, isLoading, isSuccess } = useSignUp();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.email && values.password) {
      signUp(values.email, values.password);
    }
  };

  return (
    <Form
      form={form}
      name="SignUpForm"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {isLoading && <Spin>Loading...</Spin>}
    </Form>
  );
};
