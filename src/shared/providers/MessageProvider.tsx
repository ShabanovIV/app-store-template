import { ReactNode } from 'react';
import { message } from 'antd';
import { MessageContext } from './MessageContext';

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider
      value={{
        showSuccess: messageApi.success,
        showError: messageApi.error,
        showInfo: messageApi.info,
      }}
    >
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
