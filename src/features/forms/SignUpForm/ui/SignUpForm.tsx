import { useEffect } from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { getSignUpRules } from '../lib/getSignUpRules';
import { useSignUp } from '../model/useSignUp';
import { FieldType } from '../types/fields';

interface SignUpFormProps {
  onSuccess: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm<FieldType>();
  const { signUp, isLoading, isSuccess } = useSignUp(form);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

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
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Email" name="email" rules={getSignUpRules('email', form)}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={getSignUpRules('password', form)}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> label="Confirm" name="confirm" rules={getSignUpRules('confirm', form)}>
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button disabled={isLoading} style={{ width: '100%' }} type="primary" htmlType="submit">
          {isLoading ? <Spin tip={<div>Loading...</div>} /> : 'Join'}
        </Button>
      </Form.Item>
    </Form>
  );
};
