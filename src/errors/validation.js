export default class ValidationError extends Error {
  constructor(message, code, meta = {}) {
    super();

    this.code = code || 'invalid_parameters';
    this.level = 'error';
    this.status_code = 422;
    this.generic_message = 'There was validation error, the given parameters are wrong';
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
