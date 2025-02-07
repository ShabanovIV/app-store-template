import { AppMenu } from 'src/features/AppMenu';
import { Logo } from 'src/shared/ui/Logo/Logo';
import styles from './AppHeader.module.scss';

export const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <AppMenu />
    </header>
  );
};
