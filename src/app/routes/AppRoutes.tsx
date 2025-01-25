import { Routes, Route } from 'react-router-dom';
import { ROUTES, RouteTypes } from 'src/shared/config/routes';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {Object.keys(ROUTES).map((key) => {
        const route = ROUTES[key];
        return route.type === RouteTypes.private ? (
          <Route
            key={key}
            path={route.path}
            element={
              <PrivateRoute>
                <div>{route.path}</div>
              </PrivateRoute>
            }
          />
        ) : (
          <Route key={key} path={route.path} element={<div>{route.path}</div>} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
