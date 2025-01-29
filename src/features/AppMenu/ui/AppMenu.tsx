import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from 'src/entities/User';
import { getHiddenRoutes, getWithoutHiddenRoutes } from 'src/shared/config/routes';

export const AppMenu: React.FC = () => {
  const location = useLocation();
  const isAuth = useAuth();

  const visibleRoutes = getWithoutHiddenRoutes();
  const routes = [...visibleRoutes, ...(isAuth ? getHiddenRoutes() : [])].filter(
    (route) => route.isMenuItem,
  );

  const menuItems = routes.map((route) => {
    return {
      key: route.path,
      label: <Link to={route.path}>{route.title}</Link>,
    };
  });

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} />
  );
};
