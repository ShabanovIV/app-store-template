import React from 'react';
import Header from 'src/shared/ui/Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>Footer content</footer>
    </div>
  );
};

export default Layout;
