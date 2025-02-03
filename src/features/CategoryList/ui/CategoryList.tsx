import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './CategoryList.module.scss';
import { useLoaderCategories } from '../model/useLoaderCategories';

const CategoryList: React.FC = () => {
  const { hasMore, categories, errorElement, handleLastItem } = useLoaderCategories();
  return (
    <div className={styles.container}>
      {errorElement}
      <RenderListObserver isGrid={true} items={categories} onLastItem={handleLastItem} />
      {!hasMore && <p className={styles.end}>Все категории загружены</p>}
    </div>
  );
};

export default CategoryList;
