import { useEffect } from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { Fields, useRules } from 'src/shared/lib/formValidation/useRules';
import { useSignIn } from '../model/useSignIn';
import { FieldType } from '../types/fields';

interface SignInFormProps {
  onSuccess: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const getRules = useRules();
  const { signIn, isLoading, isSuccess } = useSignIn(form);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

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
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Email" name="email" rules={getRules(Fields.email)}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType> label="Password" name="password" rules={getRules(Fields.password)}>
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          {isLoading ? <Spin /> : 'Sign In'}
        </Button>
      </Form.Item>
    </Form>
  );
};
