import { Product } from 'src/entities/Product';

export interface CartState {
  items: CartItemProps[];
}

export interface CartItemProps {
  product: Product;
  amount: number;
}
