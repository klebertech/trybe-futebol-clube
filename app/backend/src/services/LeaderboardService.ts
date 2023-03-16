import { ModelStatic } from 'sequelize';
import Match from '../database/models/MatchesModel';
import Team from '../database/models/TeamsModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import { getTeamStatusAway, getTeamStatusHome } from '../utils/calcGoals';
import IResults from '../interfaces/IResults';

export default class LeaderboardService implements IServiceLeaderboard {
  protected matchModel: ModelStatic<Match> = Match;
  protected teamModel: ModelStatic<Team> = Team;

  async readHome(): Promise<IResults[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({
      where: { inProgress: false },
    });
    const teamMatches = teams.map((element) => {
      const name = element.teamName;
      const getStatus = getTeamStatusHome(element.id, matches);
      return { name, ...getStatus };
    });
    teamMatches.sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);
    return teamMatches;
  }

  async readAway(): Promise<IResults[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({
      where: { inProgress: false },
    });
    const teamMatches = teams.map((element) => {
      const name = element.teamName;
      const getStatus = getTeamStatusAway(element.id, matches);
      return { name, ...getStatus };
    });
    teamMatches.sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn
        || b.efficiency - a.efficiency);
    return teamMatches;
  }
}
