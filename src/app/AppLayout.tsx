import React from 'react';
import { AppContent } from 'src/widgets/AppContent';
import { AppHeader } from 'src/widgets/AppHeader';
import styles from './AppLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <AppContent>{children}</AppContent>
    </div>
  );
};
