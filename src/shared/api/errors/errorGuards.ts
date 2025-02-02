import { ErrorCode, ServerErrors } from './errors';

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
