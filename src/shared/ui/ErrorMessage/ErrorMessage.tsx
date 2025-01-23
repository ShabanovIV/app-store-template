import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return <div className={styles.error}>{error}</div>;
};
