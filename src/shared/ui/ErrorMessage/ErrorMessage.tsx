import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  error: string;
  onClick?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onClick }) => {
  return (
    <div onClick={onClick} className={styles.error}>
      {error}
    </div>
  );
};
