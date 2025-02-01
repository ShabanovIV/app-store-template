import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Logo.ico';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
        <img src={logo} alt="App Store" />
      </Link>
    </div>
  );
};
