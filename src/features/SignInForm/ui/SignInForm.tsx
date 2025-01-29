import { Button, Form, FormProps, Input, Spin } from 'antd';
import { useSignIn } from '../model/useSignIn';

type FieldType = {
  email?: string;
  password?: string;
};

export const SignInForm: React.FC = () => {
  const { signIn, isLoading } = useSignIn();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.email && values.password) {
      signIn(values.email, values.password);
    }
  };

  return (
    <Form
      form={form}
      name="SignInForm"
      labelCol={{ span: 8 }}
      labelAlign="left"
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
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
