import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';
import ErrorEqualMatches from '../errors/errorEqualMatches';
import ErrorTeamNotFound from '../errors/errorTeamNotFound';

interface IMatch{
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
export default class MatchesService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;
  protected teamModel: ModelStatic<Team> = Team;

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

  async validateMatch(teamId: number): Promise<void> {
    const getTeam = await this.teamModel.findOne({ where: { id: teamId } });
    if (!getTeam) {
      throw new ErrorTeamNotFound('There is no team with such id!');
    }
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch> {
    if (homeTeamId === awayTeamId) {
      throw new ErrorEqualMatches('It is not possible to create a match with two equal teams');
    }
    await this.validateMatch(homeTeamId);
    await this.validateMatch(awayTeamId);
    const result = await this.model
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals,
      });
    const match = await this.model.findOne({ where: { id: result.id } });
    if (!match) throw new Error('Error');
    return match;
  }
}
