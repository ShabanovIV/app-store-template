import { useParams } from 'react-router-dom';
import { ProductCatalog } from 'src/widgets/shop/ProductCatalog/';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  return <ProductCatalog categoryId={categoryId!} />;
};

export default CategoryPage;
