import { isTypeWithDataAsServerErrors } from './errorGuards';
import { ErrorCode, ServerErrors } from './errors';

const globalErrorCodes = [
  ErrorCode.ERR_NOT_VALID,
  ErrorCode.ERR_AUTH,
  ErrorCode.ERR_NO_FILES,
  ErrorCode.ERR_NOT_ALLOWED,
  ErrorCode.ERR_NOT_FOUND,
  ErrorCode.ERR_INVALID_QUERY_PARAMS,
  ErrorCode.ERR_INTERNAL_SERVER,
];

export const throwIfGlobalError = (error: unknown) => {
  if (isTypeWithDataAsServerErrors(error)) {
    const hasGlobalError = includeSomeCode(error.data, globalErrorCodes);

    if (hasGlobalError) {
      throw error.data;
    }
    return;
  }

  throw error;
};

export const extractFormErrors = <T>(error: unknown): { name: keyof T; errors: string[] }[] => {
  if (isTypeWithDataAsServerErrors(error)) {
    return error.data.errors
      .filter((err) => Boolean(err.fieldName))
      .map((err) => ({
        name: err.fieldName as keyof T,
        errors: [err.message],
      }));
  }
  return [];
};

export const extractWithoutFiledErrors = (error: unknown): string | null => {
  if (isTypeWithDataAsServerErrors(error)) {
    return error.data.errors
      .filter((err) => !err.fieldName)
      .map((err) => err.message)
      .join('\n');
  }
  return null;
};

export const includeSomeCode = (error: ServerErrors, codes: ErrorCode[]) => {
  return error.errors.some((err) => codes.includes(err.extensions.code));
};

export const joinErrors = (error: ServerErrors) => {
  return error.errors.map((err) => err.message).join('\n');
};
