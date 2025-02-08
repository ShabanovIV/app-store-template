import { Product } from 'src/entities/Product';

export const calculateTotals = (products: Product[]) => {
  const totals = products.reduce(
    (acc, product) => {
      acc.totalPrice += product.price;
      acc.totalOldPrice += product.oldPrice ?? product.price;
      return acc;
    },
    { totalPrice: 0, totalOldPrice: 0 },
  );

  const totalDiscount =
    totals.totalOldPrice > 0
      ? ((totals.totalOldPrice - totals.totalPrice) * 100) / totals.totalOldPrice
      : 0;

  return {
    totalPrice: totals.totalPrice,
    totalOldPrice: totals.totalOldPrice,
    totalDiscount: Math.round(totalDiscount),
  };
};
