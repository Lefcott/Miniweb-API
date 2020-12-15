export default class AuthorizationError extends Error {
  constructor(message) {
    super();
    this.name = 'AuthorizationError';
    this.message = message;
  }
}
