export default class errorTeamNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'errorTeamNotFound';
    this.stack = '404';
  }
}
