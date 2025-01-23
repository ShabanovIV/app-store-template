import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<div>login</div>} />
      <Route path="/products" element={<div>Products</div>} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <div>Profile</div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
