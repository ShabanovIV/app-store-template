import { CategoryEditor } from 'src/widgets/editors/CategoryEditor';
import styles from './CategoryEditPage.module.scss';

const CategoryPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <CategoryEditor />
    </div>
  );
};

export default CategoryPage;
