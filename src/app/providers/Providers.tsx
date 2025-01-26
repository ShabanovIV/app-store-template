import { HashRouter } from 'react-router-dom';
import { AppLayout } from 'src/widgets/AppLayout';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HashRouter>
      <AppLayout>{children}</AppLayout>
    </HashRouter>
  );
};
