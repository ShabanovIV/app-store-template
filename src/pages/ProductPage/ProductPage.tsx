import { useParams } from 'react-router-dom';
import ProductList from 'src/features/ProductList/ui/ProductList';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  return <ProductList categoryId={categoryId!} />;
};

export default CategoryPage;
