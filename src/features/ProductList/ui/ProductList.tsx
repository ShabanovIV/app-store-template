import { Divider, Space, Spin } from 'antd';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './ProductList.module.scss';
import { useProductPaginateData } from '../model/useProductPaginateData';

interface ProductListProps {
  categoryId: string;
}

export const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
  const { hasMore, isFetching, items, handleLastItem } = useProductPaginateData(categoryId);

  return (
    <div className={styles.container}>
      <RenderListObserver items={items} onLastItem={handleLastItem} />
      {(isFetching || !hasMore) && <Divider />}
      {!hasMore && <Space className={styles.end}>Все продукты загружены</Space>}
      {isFetching && <Spin />}
    </div>
  );
};
