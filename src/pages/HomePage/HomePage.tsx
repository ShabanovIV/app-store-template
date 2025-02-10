import React from 'react';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/entities/User';
import { selectCartItems } from 'src/features/Cart';
import { ROUTES } from 'src/shared/config/routes';
import { useAppSelector } from 'src/shared/hooks/store';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const cart = useAppSelector((state) => selectCartItems(state));
  console.log(cart);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Добро пожаловать в App Store!</h1>
        <p>Откройте для себя лучшие товары по выгодным ценам.</p>
      </header>

      <Divider />

      <Space className={styles.footer}>
        {isAuth && Object.keys(cart).length > 0 && (
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.cart.path)}>
            <ShoppingCartOutlined />
            Корзина
          </Button>
        )}

        {isAuth && (
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.category.path)}>
            <ShoppingOutlined />
            Каталог
          </Button>
        )}
      </Space>
    </div>
  );
};

export default HomePage;
