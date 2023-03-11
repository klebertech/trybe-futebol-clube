import InvalidParams from '../../errors/invalidParams';
import FieldsError from '../../errors/fieldsError';

const INVALID_PARAMS = 'Invalid email or password';

export interface IUserValidations {
  checkEmail: (email: string) => void;
  checkPassword: (password: string) => void;
}

export default class UserValidations implements IUserValidations {
  private _email: string | undefined;
  private _password: string | undefined;
  private emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  checkEmail(email: string): void {
    this._email = email;
    if (!this._email) throw new FieldsError('All fields must be filled');
    if (!this.emailRegex.test(this._email)) throw new InvalidParams(INVALID_PARAMS);
  }

  checkPassword(password: string): void {
    this._password = password;
    if (!this._password) throw new FieldsError('All fields must be filled');
    if (this._password.length < 3) throw new InvalidParams(INVALID_PARAMS);
  }
}
