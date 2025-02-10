import { useCallback, useState } from 'react';
import { Button, Divider, Modal, Space, Spin } from 'antd';
import {
  Product,
  ProductCard,
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from 'src/entities/Product';
import { Action, Actions, ProductForm } from 'src/features/forms/ProductForm';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { RenderList } from 'src/shared/ui/RenderList/RenderList';
import styles from './ProductEditor.module.scss';

interface ConvertProps {
  product: Product;
  onClick?: (id: string) => void;
}

export const ProductEditor: React.FC = () => {
  const [actionProduct, setActionProduct] = useState<{
    action: Action;
    product: Product;
  } | null>(null);
  const { data, error: getAllError } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting, isSuccess, error }] = useDeleteProductMutation();
  useErrorHandler({ error: getAllError });
  useErrorHandler({ error });
  useSuccessHandler({ isSuccess, mess: 'Product delete successfully' });

  const footerItem = useCallback(
    (product: Product) => {
      return (
        <Space style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={() => {
              setActionProduct({ action: Actions.update, product });
            }}
          >
            Edit
          </Button>
          <Button danger onClick={async () => await deleteProduct(product.id)}>
            Delete
          </Button>
        </Space>
      );
    },
    [deleteProduct],
  );

  const convertProductToItem = useCallback(
    ({ product, onClick }: ConvertProps): IRenderItem => ({
      key: product.id,
      render: () => (
        <ProductCard
          product={product}
          onClick={onClick ? () => onClick(product.id) : undefined}
          footer={() => (footerItem ? footerItem(product) : undefined)}
        />
      ),
    }),
    [footerItem],
  );

  const items = data?.data.map((product) => convertProductToItem({ product })) ?? [];

  const handleCreate = () => {
    setActionProduct({
      action: Actions.create,
      product: {
        id: '',
        name: '',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        price: 0,
        category: { id: '' },
        commandId: '',
      },
    });
  };

  const handleCreated = () => {
    setActionProduct(null);
  };

  return (
    <div className={styles.container}>
      {actionProduct && (
        <Modal
          title={<p>Edit product</p>}
          open={Boolean(actionProduct)}
          loading={false}
          onCancel={() => setActionProduct(null)}
          footer={<></>}
        >
          <ProductForm
            action={actionProduct!.action}
            productId={actionProduct!.product.id}
            onCreated={handleCreated}
          />
        </Modal>
      )}
      <div>
        <Button onClick={handleCreate}>Create new product</Button>
      </div>
      <Divider />
      {isDeleting && <Spin />}
      {isDeleting && <Divider />}
      <RenderList items={items} />
    </div>
  );
};
