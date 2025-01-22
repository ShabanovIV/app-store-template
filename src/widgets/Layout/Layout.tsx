// TODO: (текущая) Реализовать Layout.tsx
// 1. Создать компонент Layout для управления макетом приложения (Header, Footer, Content).
// 2. Добавить обработку children для вставки контента.
// 3. Импортировать и интегрировать компонент Header из shared/ui/Header.
// 4. Настроить стили в Layout.module.css для контейнера макета.
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
