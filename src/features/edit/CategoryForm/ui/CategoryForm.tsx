import { useEffect, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { getCategoryRules } from '../lib/getCategoryRules';
import { useGet } from '../model/useGet';
import { useUpdate } from '../model/useUpdate';
import { FieldType } from '../types/fields';

interface CategoryFormProps {
  onIsFetchingChanged: (isFetching: boolean) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onIsFetchingChanged }) => {
  const [isChanges, setIsChanges] = useState(false);
  const [form] = Form.useForm();
  const { data, isFetching } = useGet(form);
  const { update, isUpdating, isUpdateSuccess } = useUpdate(form);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  useEffect(() => {
    onIsFetchingChanged(isFetching);
  }, [isFetching, onIsFetchingChanged]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsChanges(false);
    }
  }, [isUpdateSuccess]);

  return (
    <Form
      form={form}
      name="CategoryForm"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={update}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Id" name="id">
        <Input readOnly />
      </Form.Item>

      <Form.Item<FieldType> label="Name" name="name" rules={getCategoryRules('name')}>
        <Input onChange={() => setIsChanges(true)} placeholder="Snowboarding" />
      </Form.Item>

      <Form.Item<FieldType> label="Photo source" name="photo" rules={getCategoryRules('photo')}>
        <Input onChange={() => setIsChanges(true)} placeholder="URL or file path" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
        disabled={isFetching || isUpdating || !isChanges}
      >
        {isUpdating ? <Spin /> : 'Save'}
      </Button>
    </Form>
  );
};
