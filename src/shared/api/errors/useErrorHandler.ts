import { useEffect } from 'react';
import { FormInstance } from 'antd';
import { useMessage } from 'src/shared/hooks/useMessage';
import { extractFormErrors, extractWithoutFiledErrors, throwIfGlobalError } from './errorParser';

export interface UseErrorHandlerProps<TFields> {
  error: unknown;
  form?: FormInstance<TFields>;
}

export const useErrorHandler = <TFields>({ form, error }: UseErrorHandlerProps<TFields>) => {
  const { showError } = useMessage();

  useEffect(() => {
    if (error) {
      throwIfGlobalError(error);

      if (form) {
        form.setFields(extractFormErrors(error));
      }

      const joinedMessage = extractWithoutFiledErrors(error);
      if (joinedMessage) {
        showError(joinedMessage);
      }
    }
  }, [error, form, showError]);
};
