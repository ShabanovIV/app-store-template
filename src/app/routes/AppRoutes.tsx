import { lazy } from 'react';
import { Button, Result } from 'antd';
import { Routes, Route } from 'react-router-dom';
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
const ProfilePage = lazy(() => import('src/pages/ProfilePage/ProfilePage'));
const CategoryPage = lazy(() => import('src/pages/CategoryPage/CategoryPage'));
const ProductPage = lazy(() => import('src/pages/ProductPage/ProductPage'));
const CartPage = lazy(() => import('src/pages/CartPage/CartPage'));
const CheckoutPage = lazy(() => import('src/pages/CheckoutPage/CheckoutPage'));

const PAGES = [
  { path: ROUTES.home.path, element: <HomePage /> },
  { path: ROUTES.auth.path, element: <AuthPage /> },
  { path: ROUTES.profile.path, element: <ProfilePage /> },
  { path: ROUTES.category.path, element: <CategoryPage /> },
  { path: ROUTES.products.path, element: <ProductPage /> },
  { path: ROUTES.cart.path, element: <CartPage /> },
  { path: ROUTES.checkout.path, element: <CheckoutPage /> },
];

const AppRoutes = () => {
  const { isAuth } = useAuth();

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
  const page = PAGES.find((page) => page.path === path);
  return page ? (
    page.element
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => (window.location.href = ROUTES.home.path)} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default AppRoutes;
