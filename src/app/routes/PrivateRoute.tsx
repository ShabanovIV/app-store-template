import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'src/entities/User';
import { ROUTES } from 'src/shared/config/routes';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuth = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={ROUTES.auth.path} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
