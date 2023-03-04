import Team from '../database/models/TeamsModel';

export default interface IServiceTeam {
  readAll(): Promise<Team[]>
}
