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

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._matchesService
      .updateMatch(
        Number(id),
        Number(homeTeamGoals),
        Number(awayTeamGoals),
      );
    return res.status(200).json({ message: 'Match updated' });
  }

  async createMatch(req: Request, res: Response) {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;
    const result = await this._matchesService
      .createMatch(
        Number(homeTeamId),
        Number(awayTeamId),
        Number(homeTeamGoals),
        Number(awayTeamGoals),
      );
    return res.status(201).json(result);
  }
}

export default MatchesController;
