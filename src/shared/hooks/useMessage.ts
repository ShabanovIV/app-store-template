import { useContext } from 'react';
import { MessageContext } from 'src/shared/providers/MessageContext';

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage должен использоваться внутри <MessageProvider>');
  }
  return context;
};
