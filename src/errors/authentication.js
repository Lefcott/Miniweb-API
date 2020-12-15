export default class AuthenticationError extends Error {
  constructor(message) {
    super();
    this.name = 'AuthenticationError';
    this.message = message;
  }
}
