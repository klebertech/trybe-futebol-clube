import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/jwt';
import InvalidParams from '../errors/invalidParams';

const auth = new TokenGenerator();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw new InvalidParams('Token not found');
  const user = await auth.authToken(token);
  if (!user) throw new InvalidParams('Token not found');
  res.locals.user = user;
  next();
};

export default authMiddleware;
