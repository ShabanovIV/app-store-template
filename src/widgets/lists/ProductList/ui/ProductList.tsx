import { useCallback } from 'react';
import { Divider, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Product, useGetProductsQuery } from 'src/entities/Product';
import { ROUTES } from 'src/shared/config/routes';
import { usePaginatedData } from 'src/shared/hooks/usePaginationData';
import RenderListObserver from 'src/shared/ui/RenderList/RenderListObserver';
import { convertProductToItem } from './convertProductToItem';
import styles from './ProductList.module.scss';

interface ProductListProps {
  categoryId: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
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
      {!hasMore && <p className={styles.end}>Все категории загружены</p>}
      {isFetching && <Divider />}
      {isFetching && <Spin />}
    </div>
  );
};

export default ProductList;
