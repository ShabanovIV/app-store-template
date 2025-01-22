// TODO: Добавить роуты.
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/products" element={<div>Products</div>} />
      <Route path="/profile" element={<div>Profile</div>} />
    </Routes>
  );
};

export default AppRoutes;
