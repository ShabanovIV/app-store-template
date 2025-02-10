import { useEffect, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { getCategoryRules } from '../lib/getCategoryRules';
import { useCreate } from '../model/useCreate';
import { useGet } from '../model/useGet';
import { useUpdate } from '../model/useUpdate';
import { FieldType } from '../types/fields';

export const Actions = {
  create: 'create',
  update: 'update',
} as const;

export type Action = (typeof Actions)[keyof typeof Actions];

interface CategoryFormProps {
  action: Action;
  categoryId: string;
  onCreated: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ action, categoryId, onCreated }) => {
  const [isChanges, setIsChanges] = useState(action === Actions.create);
  const [form] = Form.useForm();
  const { data, isFetching } = useGet(action === Actions.create, categoryId, form);
  const { update, isUpdating, isUpdateSuccess } = useUpdate(form);
  const { create, isCreating, isCreatingSuccess } = useCreate(form);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  useEffect(() => {
    if (isCreatingSuccess) {
      onCreated();
    }
  }, [isCreatingSuccess, onCreated]);

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
      onFinish={action === Actions.update ? update : create}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Id" name="id" hidden={action === Actions.create}>
        <Input readOnly />
      </Form.Item>

      <Form.Item<FieldType> label="Name" name="name" rules={getCategoryRules('name')}>
        <Input onChange={() => setIsChanges(true)} placeholder="Name" />
      </Form.Item>

      <Form.Item<FieldType> label="Photo source" name="photo" rules={getCategoryRules('photo')}>
        <Input onChange={() => setIsChanges(true)} placeholder="Photo source" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
        disabled={isFetching || isUpdating || !isChanges}
      >
        {isUpdating || isCreating ? <Spin /> : action === Actions.update ? 'Save' : 'Create'}
      </Button>
    </Form>
  );
};
