import Layout from 'src/widgets/Layout/Layout';
import styles from './App.module.scss';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
