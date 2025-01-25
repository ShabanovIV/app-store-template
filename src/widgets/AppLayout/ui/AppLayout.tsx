import React from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { AppHeader } from 'src/widgets/AppHeader';
import styles from './AppLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>Footer content</Footer>
    </Layout>
  );
};
