import { useCallback } from 'react';
import { Order, OrderItem, useGetAllOrdersQuery } from 'src/entities/Order';
import { useErrorHandler } from 'src/shared/api/errors/useErrorHandler';
import { IRenderItem } from 'src/shared/ui/RenderList/IRenderItem';
import { RenderList } from 'src/shared/ui/RenderList/RenderList';
import styles from './OrderList.module.scss';

export const OrderList: React.FC = () => {
  const { data, error } = useGetAllOrdersQuery();
  useErrorHandler({ error });

  const convertCategoryToItem = useCallback(
    (order: Order): IRenderItem => ({
      key: order.id,
      render: () => <OrderItem order={order} />,
    }),
    [],
  );

  const items = data?.data.map((order) => convertCategoryToItem(order)) ?? [];

  return (
    <div className={styles.container}>
      <RenderList isGrid={false} items={items} />
    </div>
  );
};
