import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import authMiddleware from '../middlewares/auth.middleware';

const matchesRoutes = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoutes
  .get(
    '/matches',
    (req: Request, res: Response) => matchesController.readAll(req, res),
  );

matchesRoutes
  .patch(
    '/matches/:id/finish',
    authMiddleware,
    (req: Request, res: Response) => matchesController.updateFinish(req, res),
  );

matchesRoutes
  .patch(
    '/matches/:id',
    authMiddleware,
    (req: Request, res: Response) => matchesController.updateMatch(req, res),
  );
export default matchesRoutes;
