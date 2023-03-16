import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

class LeaderboardController {
  private _leaderboardService: IServiceLeaderboard;

  constructor(leaderboardService: IServiceLeaderboard) {
    this._leaderboardService = leaderboardService;
  }

  async readHome(req: Request, res: Response) {
    const result = await this._leaderboardService.readHome();
    return res.status(200).json(result);
  }

  async readAway(req: Request, res: Response) {
    const result = await this._leaderboardService.readAway();
    return res.status(200).json(result);
  }

  async readTotal(req: Request, res: Response) {
    const result = await this._leaderboardService.readTotal();
    return res.status(200).json(result);
  }
}

export default LeaderboardController;
