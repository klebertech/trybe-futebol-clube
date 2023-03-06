import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.readAllTeams(req, res));
teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.readTeam(req, res));
export default teamRoutes;
