import Match from '../database/models/MatchesModel';

interface IMatch{
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
export default interface IServiceMatch{
  readAll(): Promise<Match[]>
  readInProgress(progress: boolean): Promise<Match[]>
  updateFinish(id: number): Promise<void>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
  createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatch>
}
