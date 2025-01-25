import { BrowserRouter } from 'react-router-dom';
import Layout from 'src/widgets/Layout/Layout';
import styles from './App.module.scss';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/app-store' : '/'}>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
