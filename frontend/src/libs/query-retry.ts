import NotFoundError from 'api/error/NotFoundError';
import UnauthorizedError from 'api/error/UnauthorizedError';
import { RetryValue } from 'react-query/types/core/retryer';

export const queryRetryCondition: Exclude<RetryValue<unknown>, number | boolean> = (
  retryCount,
  err,
) => retryCount < 3
    && !NotFoundError.isNotFoundError(err)
    && !UnauthorizedError.isUnauthorizedError(err);
