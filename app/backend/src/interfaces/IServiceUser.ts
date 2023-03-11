// import User from '../database/models/UserModel';
import IUser from './IUser';

interface IRole {
  role: string;
}
export default interface IServiceUser {
  find(dto: IUser): Promise<object>
  getRole(token: string): Promise<IRole>
}
