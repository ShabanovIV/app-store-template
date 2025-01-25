import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from './Logo.ico';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  const menuItems = [
    {
      key: 'logo',
      label: (
        <Link to="/">
          <img src={logo} alt="App Store" className={styles.logo} />
        </Link>
      ),
    },
  ];

  return <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems} />;
};
