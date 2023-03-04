import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamsModel';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }
}
