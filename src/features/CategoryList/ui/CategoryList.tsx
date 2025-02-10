import { Divider, Space, Spin } from 'antd';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './CategoryList.module.scss';
import { useCategoryPaginateData } from '../model/useCategoryPaginateData';

export const CategoryList: React.FC = () => {
  const { hasMore, isFetching, items, handleLastItem } = useCategoryPaginateData();

  return (
    <div className={styles.container}>
      <RenderListObserver items={items} onLastItem={handleLastItem} />
      {(!hasMore || isFetching) && <Divider />}
      {!hasMore && <Space className={styles.end}>Все категории загружены</Space>}
      {isFetching && <Spin />}
    </div>
  );
};
