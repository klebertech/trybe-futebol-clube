import { ModelStatic } from 'sequelize';
import bcrypt = require('bcryptjs');
import User from '../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceUser';
import TokenGenerator from '../utils/jwt';
import IUser from '../interfaces/IUser';
import JWTPayload from '../interfaces/IJwtPayload';
import UserValidations from '../utils/validations/UserValidations';
import InvalidParams from '../errors/invalidParams';
// import { IUserValidations } from '../utils/validations/UserValidations';

export default class LoginService implements IServiceUser {
  protected model: ModelStatic<User> = User;
  public jwt: TokenGenerator;
  private userValidation = new UserValidations();

  constructor() {
    this.jwt = new TokenGenerator();
  }

  async find(loginDto: IUser): Promise<object> {
    const { email, password } = loginDto;
    this.userValidation.checkEmail(email);
    this.userValidation.checkPassword(password);
    const result = await this.model.findOne({
      attributes: ['id', 'username', 'password', 'role', 'email'],
      where: { email },
    });
    if (!result) throw new InvalidParams('Invalid email or password');
    const match = await bcrypt.compare(password, result.getDataValue('password'));
    if (!match) throw new InvalidParams('Invalid email or password');
    const jwtHeader: JWTPayload = {
      id: result.getDataValue('id'),
      username: result.getDataValue('username'),
      role: result.getDataValue('role'),
      email: result.getDataValue('email'),
    };
    const token = this.jwt.generateToken(jwtHeader);
    return { token };
  }
}
