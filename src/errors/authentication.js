export default class AuthenticationError extends Error {
  constructor(message) {
    super();

    this.name = 'AuthenticationError';
    this.status_code = 401;
    this.generic_message = 'There was an authentication error';
    this.message = message;
    this.stack = null;
  }
}
