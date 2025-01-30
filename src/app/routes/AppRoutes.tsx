import { lazy } from 'react';
import { Button, Result } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/entities/User';
import {
  getHiddenRoutes,
  getWithoutHiddenRoutes,
  ROUTES,
  RouteTypes,
} from 'src/shared/config/routes';
import PrivateRoute from './PrivateRoute';

const HomePage = lazy(() => import('src/pages/HomePage/HomePage'));
const AuthPage = lazy(() => import('src/pages/AuthPage/AuthPage'));

const PAGES = [
  { path: ROUTES.home.path, element: <HomePage /> },
  { path: ROUTES.auth.path, element: <AuthPage /> },
  { path: ROUTES.profile.path, element: <div>Profile</div> },
];

const AppRoutes = () => {
  const isAuth = useAuth();

  return (
    <Routes>
      {renderPrivateAndPublicRoutes()}
      {renderHiddenRoutes(isAuth)}
    </Routes>
  );
};

const renderPrivateAndPublicRoutes = () => {
  return getWithoutHiddenRoutes().map((route) => {
    return route.type === RouteTypes.private ? (
      <Route
        key={route.path}
        path={route.path}
        element={<PrivateRoute>{renderPage(route.path)}</PrivateRoute>}
      />
    ) : (
      <Route key={route.path} path={route.path} element={renderPage(route.path)} />
    );
  });
};

const renderHiddenRoutes = (isAuth: boolean) => {
  return (
    isAuth &&
    getHiddenRoutes().map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute>{renderPage(route.path)}</PrivateRoute>}
        />
      );
    })
  );
};

const renderPage = (path: string) => {
  const navigate = useNavigate();
  const page = PAGES.find((page) => page.path === path);
  return page ? (
    page.element
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate(ROUTES.home.path)} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default AppRoutes;
