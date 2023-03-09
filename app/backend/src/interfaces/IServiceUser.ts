// import User from '../database/models/UserModel';
import IUser from './IUser';

export default interface IServiceUser {
  find(dto: IUser): Promise<object>
}
