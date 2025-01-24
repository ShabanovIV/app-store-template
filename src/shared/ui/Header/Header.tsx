import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../Logo/Logo';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/products">Products</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
