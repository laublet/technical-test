import logger from '@/config/winston';

function catchError(err) {
  logger.error('catchError', err);
  const error = new Error(err);

  return error;
}

export default catchError;
