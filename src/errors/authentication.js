export default class AuthenticationError extends Error {
  constructor(message, meta = {}) {
    super();

    this.code = 'not_authenticated';
    this.level = 'warn';
    this.status_code = 401;
    this.generic_message = 'There was an authentication error';
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
