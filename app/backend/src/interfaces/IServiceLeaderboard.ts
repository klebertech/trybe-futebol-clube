import IResults from './IResults';

export default interface IServiceLeaderboard {
  readAll(): Promise<IResults[]>
}
