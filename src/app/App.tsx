import { Providers } from './providers/Providers';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
};

export default App;
