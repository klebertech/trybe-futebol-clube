import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamController {
  private _teamService: IServiceTeam;

  constructor(teamService: IServiceTeam) {
    this._teamService = teamService;
  }

  async readAllTeams(req: Request, res: Response) {
    const result = await this._teamService.readAll();
    return res.status(200).json(result);
  }

  async readTeam(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._teamService.getTeamById(+id);
    return res.status(200).json(result);
  }
}

export default TeamController;
