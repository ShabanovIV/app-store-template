import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/shared/config/routes';
import { useAppDispatch } from 'src/shared/hooks/store';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../model/authSlice';

export const UserMenu: React.FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  type MenuItem = Required<MenuProps>['items'][number];

  const menuItems: MenuItem[] = [
    {
      key: 'main',
      label: !isAuth ? <Link to={ROUTES.auth.path}>{ROUTES.auth.title}</Link> : 'Account',
      icon: isAuth && <UserOutlined />,
      children: isAuth
        ? [
            {
              key: 'profile',
              label: <Link to={ROUTES.profile.path}>{ROUTES.profile.title}</Link>,
              icon: <ProfileOutlined />,
            },
            { key: 'logout', label: 'Logout', icon: <LogoutOutlined /> },
          ]
        : undefined,
    },
  ];

  const handleClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      dispatch(logout());
    }
  };

  return (
    <Menu
      onClick={handleClick}
      theme="dark"
      mode="horizontal"
      style={{ flex: 'auto', minWidth: 0, overflow: 'visible' }}
      selectable={false}
      items={menuItems}
    />
  );
};
