import { useEffect } from 'react';
import { FormInstance, message } from 'antd';
import { extractFormErrors, extractWithoutFiledErrors, throwIfGlobalError } from './errorParser';

export interface UseErrorHandlerProps<TFields> {
  form: FormInstance<TFields>;
  error: unknown;
}

export const useErrorHandler = <TFields>({ form, error }: UseErrorHandlerProps<TFields>) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error) {
      throwIfGlobalError(error);

      form.setFields(extractFormErrors(error));

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
