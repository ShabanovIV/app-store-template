import { Product } from 'src/entities/Product';
import { CartItem } from 'src/features/Cart/ui/CartItem';

const HomePage: React.FC = () => {
  const product: Product = {
    id: '1',
    name: 'Смартфон Apple iPhone 14 Pro Max 256Gb, золотой',
    desc: 'Мощный флагман с лучшей камерой и производительностью.',
    photo:
      'https://avatars.mds.yandex.net/get-goods_pic/7755785/hat8f6091ffca0f450b46390b5e104ca74f/600x600',
    createdAt: new Date('2023-09-15T10:00:00Z'),
    updatedAt: new Date('2024-02-07T12:30:00Z'),
    oldPrice: 150000,
    price: 135000,
    commandId: 'apple-iphone-14-pro-max',
  };

  return (
    <div>
      <CartItem product={product} amount={1} />
    </div>
  );
};

export default HomePage;
