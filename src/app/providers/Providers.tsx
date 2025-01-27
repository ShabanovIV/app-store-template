import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { appStore } from 'src/app/store/appStore';
import { AppLayout } from 'src/widgets/AppLayout';
import { AppErrorBoundary } from './AppErrorBoundary/AppErrorBoundary';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AppErrorBoundary>
      <HashRouter>
        <Provider store={appStore}>
          <AppLayout>{children}</AppLayout>
        </Provider>
      </HashRouter>
    </AppErrorBoundary>
  );
};
