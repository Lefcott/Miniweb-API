export default class InternalError extends Error {
  constructor(message, meta = {}) {
    super();

    this.code = 'internal_server_error';
    this.level = 'error';
    this.status_code = 500;
    this.generic_message = 'There was an internal server error';
    this.message = message;
    this.meta = meta;
    this.stack = null;
  }
}
