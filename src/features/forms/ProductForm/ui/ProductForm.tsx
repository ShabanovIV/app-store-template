import { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Spin } from 'antd';
import { Option } from 'antd/es/mentions';
import { getProductRules } from '../lib/getProductRules';
import { useCreate } from '../model/useCreate';
import { useGet } from '../model/useGet';
import { useUpdate } from '../model/useUpdate';
import { FieldType } from '../types/fields';

export const Actions = {
  create: 'create',
  update: 'update',
} as const;

export type Action = (typeof Actions)[keyof typeof Actions];

interface ProductFormProps {
  action: Action;
  productId: string;
  onCreated: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ action, productId, onCreated }) => {
  const [isChanges, setIsChanges] = useState(action === Actions.create);
  const [form] = Form.useForm();
  const { data, dataCategories, isFetching } = useGet(action === Actions.create, productId, form);
  const { update, isUpdating, isUpdateSuccess } = useUpdate(form);
  const { create, isCreating, isCreatingSuccess } = useCreate(form);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, categoryId: data.category.id });
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
      name="ProductForm"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={action === Actions.update ? update : create}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Id" name="id" hidden={action === Actions.create}>
        <Input readOnly hidden={action === Actions.create} />
      </Form.Item>

      <Form.Item<FieldType> label="Name" name="name" rules={getProductRules('name')}>
        <Input onChange={() => setIsChanges(true)} placeholder="Name" />
      </Form.Item>

      <Form.Item<FieldType> label="Photo source" name="photo" rules={getProductRules('photo')}>
        <Input onChange={() => setIsChanges(true)} placeholder="Photo source" />
      </Form.Item>

      <Form.Item<FieldType> label="Description" name="desc">
        <Input.TextArea onChange={() => setIsChanges(true)} placeholder="Description" />
      </Form.Item>

      <Form.Item<FieldType> label="Old price" name="oldPrice" rules={getProductRules('oldPrice')}>
        <InputNumber
          style={{ width: '100%' }}
          onChange={() => setIsChanges(true)}
          placeholder="Old price"
        />
      </Form.Item>

      <Form.Item<FieldType> label="Price" name="price" rules={getProductRules('price')}>
        <InputNumber
          style={{ width: '100%' }}
          onChange={() => setIsChanges(true)}
          placeholder="Price"
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Category"
        name="categoryId"
        rules={getProductRules('categoryId')}
      >
        <Select placeholder="Category" onChange={() => setIsChanges(true)} allowClear={false}>
          {dataCategories?.data.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
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
