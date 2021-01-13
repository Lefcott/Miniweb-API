export default class AuthorizationError extends Error {
  constructor(message, meta = {}) {
    super();

    this.code = 'not_authorized';
    this.level = 'warn';
    this.status_code = 403;
    this.generic_message = 'There was an authorization error';
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
