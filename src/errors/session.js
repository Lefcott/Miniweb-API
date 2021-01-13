export default class SessionError extends Error {
  constructor(message, meta = {}) {
    super();

    this.code = 'not_logged_in';
    this.level = 'warn';
    this.status_code = 403;
    this.generic_message = "There was an session error, you're probably not logged in";
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
