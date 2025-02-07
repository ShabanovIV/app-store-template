import React from 'react';
import styles from './AppContent.module.scss';

interface AppContentProps {
  children: React.ReactNode;
}

export const AppContent: React.FC<AppContentProps> = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};
