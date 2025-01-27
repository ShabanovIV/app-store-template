import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from 'src/features/Auth';
import { MENU_ROUTES, RouteTypes } from 'src/shared/config/routes';

export const AppMenu: React.FC = () => {
  const location = useLocation();
  const isAuth = useAuth();

  const menuItems = Object.values(MENU_ROUTES)
    .filter((route) => {
      if (route.type === RouteTypes.privateHidden && !isAuth) {
        return false;
      }
      return true;
    })
    .map((route) => {
      return {
        key: route.path,
        label: <Link to={route.path}>{route.title}</Link>,
      };
    });

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} />
  );
};
