import InternalError from './internal';
import AuthenticationError from './authentication';
import AuthorizationError from './authorization';
import NotFoundError from './not_found';
import SessionError from './session';
import ValidationError from './validation';

globalThis.InternalError = InternalError;
globalThis.AuthenticationError = AuthenticationError;
globalThis.AuthorizationError = AuthorizationError;
globalThis.NotFoundError = NotFoundError;
globalThis.SessionError = SessionError;
globalThis.ValidationError = ValidationError;
