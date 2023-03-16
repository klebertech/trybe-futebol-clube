import IResults from './IResults';

export default interface IServiceLeaderboard {
  readHome(): Promise<IResults[]>
  readAway(): Promise<IResults[]>
}
