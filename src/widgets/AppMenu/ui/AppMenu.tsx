import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from 'src/shared/config/routes';

export const AppMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = Object.values(ROUTES).map((route) => ({
    key: route.path,
    label: <Link to={route.path}>{route.title}</Link>,
  }));

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} items={menuItems} />
  );
};
