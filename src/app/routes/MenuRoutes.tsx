import { Routes, Route } from 'react-router-dom';
import { MENU_ROUTES, RouteTypes } from 'src/shared/config/routes';
import PrivateRoute from './PrivateRoute';

const MenuRoutes = () => {
  return (
    <Routes>
      {Object.keys(MENU_ROUTES).map((key) => {
        const route = MENU_ROUTES[key];
        return route.type === RouteTypes.private || route.type === RouteTypes.privateHidden ? (
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
          <Route key={key} path={route.path} element={route.render()} />
        );
      })}
    </Routes>
  );
};

export default MenuRoutes;
