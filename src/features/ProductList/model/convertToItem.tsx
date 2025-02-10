import { Product, ProductCard } from 'src/entities/Product';
import AddToCart from 'src/features/Cart/ui/AddToCart';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';

export const convertToItem = (product: Product): IRenderItem => ({
  key: product.id,
  render: () => (
    <ProductCard product={product} footer={() => <AddToCart productId={product.id} />} />
  ),
});
