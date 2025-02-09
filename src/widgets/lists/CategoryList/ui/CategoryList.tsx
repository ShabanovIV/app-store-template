import { useCallback } from 'react';
import { Divider, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Category, CategoryCard, useGetCategoriesQuery } from 'src/entities/Category';
import { ROUTES } from 'src/shared/config/routes';
import { usePaginatedData } from 'src/shared/hooks/usePaginationData';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './CategoryList.module.scss';

interface ConvertProps {
  category: Category;
  onClick?: (id: string) => void;
}

interface CategoryListProps {
  footerItem?: () => React.ReactNode;
}

export const CategoryList: React.FC<CategoryListProps> = ({ footerItem }) => {
  const navigate = useNavigate();

  const fetchFunction = useCallback(
    (pagination: { pageSize: number; pageNumber: number }, skip: boolean) => {
      return useGetCategoriesQuery(
        { pagination, sorting: { type: 'ASC', field: 'createdAt' } },
        { skip },
      );
    },
    [],
  );

  const convertCategoryToItem = useCallback(
    ({ category, onClick }: ConvertProps): IRenderItem => ({
      key: category.id,
      render: () => (
        <CategoryCard
          category={category}
          onClick={onClick ? () => onClick(category.id) : undefined}
          footer={footerItem}
        />
      ),
    }),
    [footerItem],
  );

  const convertItem = useCallback(
    (category: Category) => {
      return convertCategoryToItem({
        category,
        onClick: () => navigate(`${ROUTES.products.basePath}${category.id}`),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [convertCategoryToItem],
  );

  const { hasMore, isFetching, items, handleLastItem } = usePaginatedData({
    fetchFunction,
    convertItem,
  });

  return (
    <div className={styles.container}>
      <RenderListObserver items={items} onLastItem={handleLastItem} />
      {(!hasMore || isFetching) && <Divider />}
      {!hasMore && <Space className={styles.end}>Все категории загружены</Space>}
      {isFetching && <Spin />}
    </div>
  );
};
