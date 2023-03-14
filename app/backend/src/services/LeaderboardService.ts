import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import getTeamStatus from '../utils/calcGoals';
import IResults from '../interfaces/IResults';

export default class LeaderboardService implements IServiceLeaderboard {
  protected matchModel: ModelStatic<Match> = Match;
  protected teamModel: ModelStatic<Team> = Team;

  async readAll(): Promise<IResults[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const teamMatches = teams.map((element) => {
      const name = element.teamName;
      const getStatus = getTeamStatus(element.id, matches);
      return { name, ...getStatus };
    });
    return teamMatches;
  }
}
