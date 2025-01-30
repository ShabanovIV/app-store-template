import React from 'react';
import { Layout } from 'antd';
import { UserMenu } from 'src/entities/User';
import { AppMenu } from 'src/features/AppMenu';
import { Logo } from 'src/shared/ui/Logo/Logo';
import styles from './AppHeader.module.scss';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <Logo />
      <div className={styles.menuContainer}>
        <AppMenu />
      </div>
      <div className={styles.userMenu}>
        <UserMenu />
      </div>
    </Header>
  );
};
