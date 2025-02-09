import { useCallback } from 'react';
import { Divider, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Product, ProductCard, useGetProductsQuery } from 'src/entities/Product';
import { ROUTES } from 'src/shared/config/routes';
import { usePaginatedData } from 'src/shared/hooks/usePaginationData';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import styles from './ProductList.module.scss';

interface ConvertProps {
  product: Product;
  onClick?: (id: string) => void;
}

interface ProductListProps {
  categoryId: string;
  footerItem?: (productId: string) => React.ReactNode;
}

export const ProductList: React.FC<ProductListProps> = ({ categoryId, footerItem }) => {
  const navigate = useNavigate();

  const fetchFunction = useCallback(
    (pagination: { pageSize: number; pageNumber: number }, skip: boolean) => {
      return useGetProductsQuery(
        {
          pagination,
          categoryIds: [categoryId],
          sorting: { type: 'ASC', field: 'createdAt' },
        },
        { skip },
      );
    },
    [categoryId],
  );

  const convertProductToItem = ({ product, onClick }: ConvertProps): IRenderItem => ({
    key: product.id,
    render: () => (
      <ProductCard
        product={product}
        onClick={onClick ? () => onClick(product.id) : undefined}
        footer={() => (footerItem ? footerItem(product.id) : undefined)}
      />
    ),
  });

  const convertItem = useCallback(
    (product: Product) => {
      return convertProductToItem({
        product,
        onClick: () => navigate(`${ROUTES.products.basePath}${product.id}`),
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { hasMore, isFetching, items, handleLastItem } = usePaginatedData({
    fetchFunction,
    convertItem,
  });

  return (
    <div className={styles.container}>
      <RenderListObserver items={items} onLastItem={handleLastItem} />
      {(isFetching || !hasMore) && <Divider />}
      {!hasMore && <Space className={styles.end}>Все продукты загружены</Space>}
      {isFetching && <Spin />}
    </div>
  );
};
