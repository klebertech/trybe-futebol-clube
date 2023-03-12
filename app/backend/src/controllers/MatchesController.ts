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
    // } if (query.inProgress === 'true') {
    //   const result = await this._matchesService.readInProgress(query.inProgress);
    //   return res.status(200).json(result);
    // } if (query.inProgress === 'false') {
    }
    const result = await this._matchesService.readInProgress(JSON.parse(progress));
    return res.status(200).json(result);
  }
}

export default MatchesController;
