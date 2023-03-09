import { ModelStatic } from 'sequelize';
// import bcrypt = require('bcryptjs');
import User from '../database/models/UserModel';
import IServiceUser from '../interfaces/IServiceUser';
import TokenGenerator from '../utils/jwt';
import IUser from '../interfaces/IUser';
import JWTPayload from '../interfaces/IJwtPayload';
import FieldsError from '../errors/fieldsError';

export default class LoginService implements IServiceUser {
  protected model: ModelStatic<User> = User;
  public jwt: TokenGenerator;

  constructor() {
    this.jwt = new TokenGenerator();
  }

  async find(loginDto: IUser): Promise<object> {
    const { email } = loginDto;
    if (!email) throw new FieldsError('All fields must be filled');
    const result = await this.model.findOne({ attributes: ['id', 'username', 'role', 'email'],
      where: { email },
    });
    if (!result) throw new Error(`Could not find ${loginDto.email}`);
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
