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
