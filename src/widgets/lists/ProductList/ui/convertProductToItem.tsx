import { Product } from 'src/entities/Product/types/product';
import { ProductCard } from 'src/entities/Product/ui/ProductCard';
import AddToCart from 'src/features/Cart/ui/AddToCart';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';

interface ConvertProps {
  product: Product;
  onClick?: (id: string) => void;
}

export const convertProductToItem = ({ product, onClick }: ConvertProps): IRenderItem => ({
  key: product.id,
  render: () => (
    <ProductCard
      product={product}
      onClick={onClick ? () => onClick(product.id) : undefined}
      footer={() => <AddToCart productId={product.id} />}
    />
  ),
});
