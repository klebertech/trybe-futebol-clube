import Match from '../database/models/MatchesModel';

export default interface IServiceMatch{
  readAll(): Promise<Match[]>;
}
