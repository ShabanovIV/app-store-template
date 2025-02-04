import { Divider, Spin } from 'antd';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './CategoryList.module.scss';
import { useLoaderCategories } from '../model/useLoaderCategories';

const CategoryList: React.FC = () => {
  const { hasMore, isFetching, categories, handleLastItem } = useLoaderCategories();
  return (
    <div className={styles.container}>
      <RenderListObserver isGrid={true} items={categories} onLastItem={handleLastItem} />
      {!hasMore && <p className={styles.end}>Все категории загружены</p>}
      {isFetching && <Divider />}
      {isFetching && <Spin />}
    </div>
  );
};

export default CategoryList;
