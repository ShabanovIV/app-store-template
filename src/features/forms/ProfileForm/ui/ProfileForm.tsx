import { useEffect, useState } from 'react';
import { Button, Form, FormProps, Input, Spin } from 'antd';
import { getProfileRules } from '../lib/getProfileRules';
import { useProfile } from '../model/useProfile';
import { FieldType } from '../types/fields';

export const ProfileForm: React.FC = () => {
  const [isChanges, setIsChanges] = useState(false);
  const [form] = Form.useForm();
  const { data, update, isUpdateSuccess, isLoading, isUpdating } = useProfile(form);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsChanges(false);
    }
  }, [isUpdateSuccess]);

  const handleChange = () => {
    setIsChanges(true);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    update(values.name);
  };

  return (
    <Form
      form={form}
      name="ProfileForm"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Full Name" name="name" rules={getProfileRules('name')}>
        <Input onChange={handleChange} placeholder="John Doe" />
      </Form.Item>

      <Form.Item<FieldType> label="Email" name="email">
        <Input readOnly />
      </Form.Item>

      <Form.Item<FieldType> label="Date of Registration" name="signUpDate">
        <Input readOnly />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
        disabled={isLoading || isUpdating || !isChanges}
      >
        {isLoading ? <Spin /> : 'Save'}
      </Button>
    </Form>
  );
};
