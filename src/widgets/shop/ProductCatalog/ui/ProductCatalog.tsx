import AddToCart from 'src/features/Cart/ui/AddToCart';
import ProductList from 'src/features/ProductList/ui/ProductList';

interface ProductCatalogProps {
  categoryId: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ categoryId }) => {
  return (
    <ProductList
      categoryId={categoryId}
      footerItem={(productId: string) => <AddToCart productId={productId} />}
    />
  );
};
