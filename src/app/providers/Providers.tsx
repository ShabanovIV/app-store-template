import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { appStore } from 'src/app/store/appStore';
import { MessageProvider } from 'src/shared/providers/MessageProvider';
import { AppErrorBoundary } from './AppErrorBoundary/AppErrorBoundary';
import { AppLayout } from '../AppLayout';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <MessageProvider>
      <AppErrorBoundary>
        <HashRouter>
          <Provider store={appStore}>
            <AppLayout>{children}</AppLayout>
          </Provider>
        </HashRouter>
      </AppErrorBoundary>
    </MessageProvider>
  );
};
