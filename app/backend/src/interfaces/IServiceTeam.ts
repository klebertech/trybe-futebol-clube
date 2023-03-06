import Team from '../database/models/TeamsModel';

export default interface IServiceTeam {
  readAll(): Promise<Team[]>
  getTeamById(id:number): Promise<Team>
}
