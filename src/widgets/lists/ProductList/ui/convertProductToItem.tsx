import { Product } from 'src/entities/Product/types/product';
import { ProductCard } from 'src/entities/Product/ui/ProductCard';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';

interface ConvertProps {
  product: Product;
  onClick?: (id: string) => void;
  footer?: () => React.ReactNode;
}

export const convertProductToItem = ({ product, onClick, footer }: ConvertProps): IRenderItem => ({
  key: product.id,
  render: () => (
    <ProductCard
      product={product}
      onClick={onClick ? () => onClick(product.id) : undefined}
      footer={footer}
    />
  ),
});
