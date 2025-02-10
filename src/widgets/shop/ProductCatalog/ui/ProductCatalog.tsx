import { ProductList } from 'src/features/ProductList';

interface ProductCatalogProps {
  categoryId: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ categoryId }) => {
  return <ProductList categoryId={categoryId} />;
};
