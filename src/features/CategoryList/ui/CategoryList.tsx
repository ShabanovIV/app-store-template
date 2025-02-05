import { useCallback } from 'react';
import { Divider, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Category, useGetCategoriesQuery } from 'src/entities/Category';
import { convertToIRenderItem } from 'src/entities/Category/ui/convertToIRenderItem';
import { ROUTES } from 'src/shared/config/routes';
import { usePaginatedData } from 'src/shared/hooks/usePaginationData';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './CategoryList.module.scss';

const CategoryList: React.FC = () => {
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

  const convertItem = useCallback((category: Category) => {
    return convertToIRenderItem({
      category,
      onClick: () => navigate(`${ROUTES.products.basePath}${category.id}`),
    });
  }, []);

  const { hasMore, isFetching, items, handleLastItem } = usePaginatedData({
    fetchFunction,
    convertItem,
  });

  return (
    <div className={styles.container}>
      <RenderListObserver isGrid={true} items={items} onLastItem={handleLastItem} />
      {!hasMore && <p className={styles.end}>Все категории загружены</p>}
      {isFetching && <Divider />}
      {isFetching && <Spin />}
    </div>
  );
};

export default CategoryList;
