import { Providers } from './providers/Providers';
import MenuRoutes from './routes/MenuRoutes';

const App: React.FC = () => {
  return (
    <Providers>
      <MenuRoutes />
    </Providers>
  );
};

export default App;
