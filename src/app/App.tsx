import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from 'src/widgets/AppLayout/';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/app-store' : '/'}>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
