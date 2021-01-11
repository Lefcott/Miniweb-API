export default class AuthorizationError extends Error {
  constructor(message) {
    super();

    this.name = 'AuthorizationError';
    this.status_code = 403;
    this.generic_message = 'There was an authorization error';
    this.message = message;
    this.stack = null;
  }
}
