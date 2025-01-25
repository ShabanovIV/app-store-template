import React from 'react';
import AppHeader from 'src/shared/ui/AppHeader/AppHeader';
import styles from './AppLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>Footer content</footer>
    </div>
  );
};

export default AppLayout;
