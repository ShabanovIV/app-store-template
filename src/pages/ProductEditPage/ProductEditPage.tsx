import { ProductEditor } from 'src/widgets/editors/ProductEditor';
import styles from './ProductEditPage.module.scss';

const ProductPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <ProductEditor />
    </div>
  );
};

export default ProductPage;
