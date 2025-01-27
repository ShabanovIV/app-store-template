import { Button, Form, FormProps, Input } from 'antd';
import { ErrorMessage } from 'src/shared/ui/ErrorMessage/ErrorMessage';
import { useSignIn } from '../model/useSignIn';

type FieldType = {
  username?: string;
  password?: string;
};

const SignInForm: React.FC = () => {
  const { signIn, isError } = useSignIn();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.username && values.password) {
      signIn(values.username, values.password);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {isError && <ErrorMessage error="Error" />}
      <Form.Item<FieldType>
        label="Username"
        name="username"
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
    </Form>
  );
};

export default SignInForm;
