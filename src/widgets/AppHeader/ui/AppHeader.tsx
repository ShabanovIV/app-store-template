import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { AppMenu } from 'src/features/AppMenu';
import { Logo } from 'src/shared/ui/Logo/Logo';
import styles from './AppHeader.module.scss';

export const AppHeader: React.FC = () => {
  return (
    <Header className={styles.header}>
      <Logo />
      <AppMenu />
    </Header>
  );
};
