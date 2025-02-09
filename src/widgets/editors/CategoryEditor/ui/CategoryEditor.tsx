import { useCallback, useState } from 'react';
import { Button, Divider, Modal, Space, Spin } from 'antd';
import {
  Category,
  CategoryCard,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from 'src/entities/Category';
import { Action, Actions, CategoryForm } from 'src/features/forms/CategoryForm/ui/CategoryForm';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { useSuccessHandler } from 'src/shared/hooks/useSuccessHandler';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { RenderList } from 'src/shared/ui/RenderList/RenderList';
import styles from './CategoryEditor.module.scss';

interface ConvertProps {
  category: Category;
  onClick?: (id: string) => void;
}

export const CategoryEditor: React.FC = () => {
  const [actionCategory, setActionCategory] = useState<{
    action: Action;
    category: Category;
  } | null>(null);
  const { data, error: getAllError } = useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting, isSuccess, error }] = useDeleteCategoryMutation();
  useErrorHandler({ error: getAllError });
  useErrorHandler({ error });
  useSuccessHandler({ isSuccess, mess: 'Category delete successfully' });

  const footerItem = useCallback(
    (category: Category) => {
      return (
        <Space style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={() => {
              setActionCategory({ action: Actions.update, category });
            }}
          >
            Edit
          </Button>
          <Button danger onClick={async () => await deleteCategory(category.id)}>
            Delete
          </Button>
        </Space>
      );
    },
    [deleteCategory],
  );

  const convertCategoryToItem = useCallback(
    ({ category, onClick }: ConvertProps): IRenderItem => ({
      key: category.id,
      render: () => (
        <CategoryCard
          category={category}
          onClick={onClick ? () => onClick(category.id) : undefined}
          footer={() => (footerItem ? footerItem(category) : undefined)}
        />
      ),
    }),
    [footerItem],
  );

  const items = data?.data.map((category) => convertCategoryToItem({ category })) ?? [];

  const handleCreate = () => {
    setActionCategory({
      action: Actions.create,
      category: {
        id: '',
        name: '',
        commandId: '',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });
  };

  const handleCreated = () => {
    setActionCategory(null);
  };

  return (
    <div className={styles.container}>
      {actionCategory && (
        <Modal
          title={<p>Edit category</p>}
          open={Boolean(actionCategory)}
          loading={false}
          onCancel={() => setActionCategory(null)}
          footer={<></>}
        >
          <CategoryForm
            action={actionCategory!.action}
            categoryId={actionCategory!.category.id}
            onCreated={handleCreated}
          />
        </Modal>
      )}
      <div>
        <Button onClick={handleCreate}>Create new category</Button>
      </div>
      <Divider />
      {isDeleting && <Spin />}
      {isDeleting && <Divider />}
      <RenderList items={items} />
    </div>
  );
};
