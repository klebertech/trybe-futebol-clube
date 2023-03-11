import { Request, Response, Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import authMiddleware from '../middlewares/auth.middleware';

const loginRoutes = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRoutes.post('/login', (req: Request, res: Response) => loginController.login(req, res));
loginRoutes.get(
  '/login/role',
  authMiddleware,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default loginRoutes;
