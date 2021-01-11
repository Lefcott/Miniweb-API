export default class NotFoundError extends Error {
  constructor(message) {
    super();

    this.name = 'NotFoundError';
    this.status_code = 403;
    this.generic_message = 'The requested resource was not found';
    this.message = message;
    this.stack = null;
  }
}
