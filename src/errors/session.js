export default class SessionError extends Error {
  constructor(message) {
    super();

    this.name = 'SessionError';
    this.status_code = 403;
    this.generic_message = "There was an session error, you're probably not logged in";
    this.message = message;
    this.stack = null;
  }
}
