import { LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from 'src/entities/User';
import { getHiddenRoutes, getWithoutHiddenRoutes, ROUTES } from 'src/shared/config/routes';
import { useAppDispatch } from 'src/shared/hooks/store';
import styles from './AppMenu.module.scss';

export const AppMenu: React.FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const visibleRoutes = getWithoutHiddenRoutes();
  const routes = [...visibleRoutes, ...(isAuth ? getHiddenRoutes() : [])].filter(
    (route) => route.isMenuItem,
  );

  const handleLogout = () => {
    if (isAuth) {
      dispatch(logout());
      navigate(ROUTES.home.path);
    }
  };

  return (
    <ul className={styles.menu}>
      {routes.map((route) => {
        return (
          <li className={styles.item} key={route.path}>
            <Link to={route.path}>{route.title}</Link>
          </li>
        );
      })}
      <li className={styles.item} key="signin-signout" onClick={handleLogout}>
        {isAuth ? (
          <LogoutOutlined style={{ cursor: 'pointer' }} />
        ) : (
          <Link to={ROUTES.auth.path}>{ROUTES.auth.title}</Link>
        )}
      </li>
    </ul>
  );
};
