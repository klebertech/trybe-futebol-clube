import { SignOptions } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');
import JWTPayload from '../interfaces/IJwtPayload';
import InvalidParams from '../errors/invalidParams';

const TOKEN_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const config: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class TokenGenerator {
  jwtConfigDefault: SignOptions;
  _token: string | undefined;

  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfigDefault = config;
    } else this.jwtConfigDefault = jwtConfig;
  }

  public generateToken(payload: JWTPayload) {
    return jwt.sign(payload, TOKEN_SECRET, this.jwtConfigDefault);
  }

  public async authToken(token: string) {
    this._token = token;
    if (!token) throw new InvalidParams('Token not found');
    try {
      const verify = await jwt.verify(this._token, TOKEN_SECRET);
      return verify;
    } catch (err) {
      throw new InvalidParams('Token must be a valid token');
    }
  }
}

export default TokenGenerator;
