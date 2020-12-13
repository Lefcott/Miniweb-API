globalThis.AuthenticationError = class extends Error {
  constructor(message) {
    super();
    this.name = 'AuthenticationError';
    this.message = message;
  }
};
