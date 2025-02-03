import { useEffect } from 'react';
import { FormInstance, message } from 'antd';
import { extractFormErrors, extractWithoutFiledErrors, throwIfGlobalError } from './errorParser';

export interface UseErrorHandlerProps<TFields> {
  error: unknown;
  form?: FormInstance<TFields>;
}

export const useErrorHandler = <TFields>({ form, error }: UseErrorHandlerProps<TFields>) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error) {
      throwIfGlobalError(error);

      if (form) {
        form.setFields(extractFormErrors(error));
      }

      const joinedMessage = extractWithoutFiledErrors(error);
      if (joinedMessage) {
        messageApi.error(joinedMessage);
      }
    }
  }, [error, form, messageApi]);

  return {
    errorElement: contextHolder,
  };
};
