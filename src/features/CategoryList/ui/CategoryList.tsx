import { Divider, Spin } from 'antd';
import { Category, useGetCategoriesQuery } from 'src/entities/Category';
import { convertToIRenderItem } from 'src/entities/Category/ui/convertToIRenderItem';
import { ROUTES } from 'src/shared/config/routes';
import { usePaginatedData } from 'src/shared/hooks/usePaginationData';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './CategoryList.module.scss';

const CategoryList: React.FC = () => {
  const { hasMore, isFetching, items, handleLastItem } = usePaginatedData<Category>(
    useGetCategoriesQuery,
    (category, navigate) =>
      convertToIRenderItem({
        category,
        onClick: () => navigate(`${ROUTES.products.basePath}${category.id}`),
      }),
  );

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
