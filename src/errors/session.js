export default class SessionError extends Error {
  constructor(message) {
    super();
    this.name = 'SessionError';
    this.message = message;
  }
}
