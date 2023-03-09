import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

class LoginController {
  private _loginService: IServiceUser;

  constructor(loginService: IServiceUser) {
    this._loginService = loginService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const result = await this._loginService.find(req.body);
    return res.status(200).json(result);
  }
}

export default LoginController;
