import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

class LeaderboardController {
  private _leaderboardService: IServiceLeaderboard;

  constructor(leaderboardService: IServiceLeaderboard) {
    this._leaderboardService = leaderboardService;
  }

  async readAll(req: Request, res: Response) {
    const result = await this._leaderboardService.readAll();
    return res.status(200).json(result);
  }
}

export default LeaderboardController;
