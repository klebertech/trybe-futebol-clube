import Match from '../database/models/MatchesModel';

export default interface IServiceMatch{
  readAll(): Promise<Match[]>
  readInProgress(progress: boolean): Promise<Match[]>
  updateFinish(id: number): Promise<void>
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}
