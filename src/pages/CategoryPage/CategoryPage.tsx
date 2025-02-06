import CategoryList from 'src/features/CategoryList/ui/CategoryList';
import styles from './CategoryPage.module.scss';

const CategoryPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <CategoryList />
    </div>
  );
};

export default CategoryPage;
