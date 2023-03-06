import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getTeamById(id: number): Promise<Team> {
    const team = await this.model.findOne({ where: { id } });
    if (!team) throw new Error(`Team ${id} not found`);
    return team;
  }
}
