import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';

export default class MatchesService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    const result = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return result;
  }

  async readInProgress(progress: boolean): Promise<Match[]> {
    const result = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
      where: { inProgress: progress },
    });
    return result;
  }

  async updateFinish(id: number): Promise<void> {
    await this.model.update({
      inProgress: false,
    }, {
      where: {
        id,
      },
    });
  }

  async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });
  }
}
