import { BrowserRouter } from 'react-router-dom';
import AppLayout from 'src/widgets/AppLayout/AppLayout';
import styles from './App.module.scss';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/app-store' : '/'}>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
