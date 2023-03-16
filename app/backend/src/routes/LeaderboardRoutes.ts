import { Request, Response, Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes
  .get(
    '/leaderboard/home',
    (req: Request, res: Response) => leaderboardController.readHome(req, res),
  );

leaderboardRoutes
  .get(
    '/leaderboard/away',
    (req: Request, res: Response) => leaderboardController.readAway(req, res),
  );

export default leaderboardRoutes;
