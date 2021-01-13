export default class NotFoundError extends Error {
  constructor(message, meta = {}) {
    super();

    this.code = 'not_found';
    this.level = 'warn';
    this.status_code = 404;
    this.generic_message = 'The requested resource was not found';
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
