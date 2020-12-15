import ValidationError from './validation';
import AuthenticationError from './authentication';
import AuthorizationError from './authorization';
import SessionError from './session';

globalThis.ValidationError = ValidationError;
globalThis.AuthenticationError = AuthenticationError;
globalThis.AuthorizationError = AuthorizationError;
globalThis.SessionError = SessionError;
