/* eslint-disable max-lines */
export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };
    name: string;
    fieldName?: string;
    stack: string;
    message: string;
  }[];
};

export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD',
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST',
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED',
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD',
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD',
  ERR_NOT_VALID = 'ERR_NOT_VALID',
  ERR_AUTH = 'ERR_AUTH',
  ERR_NO_FILES = 'ERR_NO_FILES',
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED',
  ERR_NOT_FOUND = 'ERR_NOT_FOUND',
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR',
  ERR_INVALID_QUERY_PARAMS = 'ERR_INVALID_QUERY_PARAMS',
  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER',
}

const codesToUp: ErrorCode[] = [
  ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD,
  ErrorCode.ERR_ACCOUNT_ALREADY_EXIST,
  ErrorCode.ERR_FIELD_REQUIRED,
  ErrorCode.ERR_NOT_VALID,
  ErrorCode.ERR_AUTH,
  ErrorCode.ERR_NO_FILES,
  ErrorCode.ERR_NOT_ALLOWED,
  ErrorCode.ERR_NOT_FOUND,
  ErrorCode.ERR_INVALID_QUERY_PARAMS,
  ErrorCode.ERR_INTERNAL_SERVER,
];

export const upToErrBoundary = (error: unknown) => {
  if (isTypeWithDataAsServerErrors(error)) {
    const shouldUp = includeCode(error.data, codesToUp);
    if (shouldUp) {
      throw error.data;
    }
    return;
  } else if (isMessage(error)) {
    throw new Error(error.message);
  }
};

export const includeCode = (error: ServerErrors, codes: ErrorCode[]) => {
  return error.errors.some((err) => codes.includes(err.extensions.code));
};

export const joinErrors = (error: ServerErrors) => {
  return error.errors.map((err) => err.message).join('\n');
};

export const isMessage = (error: unknown): error is { message: string } => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if ('message' in error && typeof (error as { message: unknown }).message === 'string') {
    return true;
  }

  return false;
};

export const isTypeWithDataAsServerErrors = (error: unknown): error is { data: ServerErrors } => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if (!('data' in error) || !isServerErrors((error as { data: unknown })?.data)) {
    return false;
  }

  return true;
};

export const isServerErrors = (error: unknown): error is ServerErrors => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if (!('errors' in error) || !Array.isArray((error as ServerErrors).errors)) {
    return false;
  }

  return (error as ServerErrors).errors.every(
    (err: unknown): err is ServerErrors['errors'][number] => {
      if (typeof err !== 'object' || err === null) {
        return false;
      }

      if (
        typeof (err as ServerErrors['errors'][number]).name !== 'string' ||
        typeof (err as ServerErrors['errors'][number]).message !== 'string' ||
        typeof (err as ServerErrors['errors'][number]).stack !== 'string'
      ) {
        return false;
      }

      if (
        !('extensions' in err) ||
        typeof (err as ServerErrors['errors'][number]).extensions !== 'object' ||
        (err as ServerErrors['errors'][number]).extensions === null
      ) {
        return false;
      }

      if (
        typeof (err as ServerErrors['errors'][number]).extensions.code !== 'string' ||
        !(Object.values(ErrorCode) as string[]).includes(
          (err as ServerErrors['errors'][number]).extensions.code,
        )
      ) {
        return false;
      }

      if (
        'fieldName' in err &&
        typeof (err as ServerErrors['errors'][number]).fieldName !== 'string'
      ) {
        return false;
      }

      return true;
    },
  );
};
