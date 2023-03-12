import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchesController {
  private _matchesService: IServiceMatch;

  constructor(matchesService: IServiceMatch) {
    this._matchesService = matchesService;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._matchesService.readAll();
    return res.status(200).json(result);
  }
}

export default MatchesController;
