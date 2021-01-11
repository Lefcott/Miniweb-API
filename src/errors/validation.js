export default class ValidationError extends Error {
  constructor(message) {
    super();

    this.name = 'ValidationError';
    this.status_code = 422;
    this.generic_message = 'There was validation error, the given parameters are wrong';
    this.message = message;
    this.stack = null;
  }
}
