export function createHttpError(message, status = 400, code = 'BAD_REQUEST', details) {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  if (details !== undefined) err.details = details;
  return err;
}

export function assert(condition, message, status = 400, code = 'BAD_REQUEST', details) {
  if (!condition) {
    throw createHttpError(message, status, code, details);
  }
}

