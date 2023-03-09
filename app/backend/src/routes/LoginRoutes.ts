import { Request, Response, Router } from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';

const loginRoutes = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRoutes.post('/login', (req: Request, res: Response) => loginController.login(req, res));

export default loginRoutes;
