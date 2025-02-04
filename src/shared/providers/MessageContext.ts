import { createContext } from 'react';

type MessageContextType = {
  showSuccess: (content: string) => void;
  showError: (content: string) => void;
  showInfo: (content: string) => void;
};

export const MessageContext = createContext<MessageContextType | undefined>(undefined);
