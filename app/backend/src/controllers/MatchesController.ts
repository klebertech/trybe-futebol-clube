import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchesController {
  private _matchesService: IServiceMatch;

  constructor(matchesService: IServiceMatch) {
    this._matchesService = matchesService;
  }

  async readAll(req: Request, res: Response) {
    const { query } = req;
    const progress = query.inProgress as string;
    if (!query.inProgress) {
      const result = await this._matchesService.readAll();
      return res.status(200).json(result);
    }
    const result = await this._matchesService.readInProgress(JSON.parse(progress));
    return res.status(200).json(result);
  }

  async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchesService.updateFinish(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}

export default MatchesController;
