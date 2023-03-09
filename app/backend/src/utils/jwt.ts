import { SignOptions } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');
import JWTPayload from '../interfaces/IJwtPayload';

const TOKEN_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const config: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class TokenGenerator {
  jwtConfigDefault: SignOptions;

  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfigDefault = config;
    } else this.jwtConfigDefault = jwtConfig;
  }

  public generateToken(payload: JWTPayload) {
    return jwt.sign(payload, TOKEN_SECRET, this.jwtConfigDefault);
  }
}

export default TokenGenerator;
