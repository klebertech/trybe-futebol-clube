import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';
// import { IServiceUser } from '../services/LoginService';

class LoginController {
  private _loginService: IServiceUser;

  constructor(loginService: IServiceUser) {
    this._loginService = loginService;
  }

  async login(req: Request, res: Response) {
    const result = await this._loginService.find(req.body);
    return res.status(200).json(result);
  }

  async getRole(req: Request, res: Response) {
    const { role } = res.locals.user;
    const result = await this._loginService.getRole(role);
    return res.status(200).json(result);
  }
}

export default LoginController;
