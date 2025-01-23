// TODO: (текущая) Реализовать Logo.tsx
// 1. Создать компонент Logo для отображения логотипа приложения.
// 2. Настроить поддержку ссылок (например, кликабельность для перехода на главную страницу).
// 3. Добавить обработку изображений, используя динамический импорт, если необходимо.
import React from 'react';
import { ShopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link to="/">
        <ShopOutlined height={64} width={64} />
      </Link>
    </div>
  );
};

export default Logo;
