export default class ValidationError extends Error {
  constructor(message, meta = {}) {
    super();

    this.code = 'invalid_parameters';
    this.level = 'warn';
    this.status_code = 422;
    this.generic_message = 'There was validation error, the given parameters are wrong';
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
