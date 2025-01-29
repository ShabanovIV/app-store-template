import { useEffect } from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { useSignUp } from '../model/useSignUp';

type FieldType = {
  email?: string;
  password?: string;
};

export const SignUpForm: React.FC = () => {
  const { signUp, isLoading, isFieldErrors, fieldErrors } = useSignUp();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isFieldErrors) {
      form.setFields(fieldErrors);
    }
  }, [isFieldErrors, fieldErrors]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.email && values.password) {
      signUp(values.email, values.password);
    }
  };

  return (
    <Form
      form={form}
      name="SignUpForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1>Join</h1>
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
