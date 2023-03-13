export default class errorEqualMatches extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'errorEqualMatches';
    this.stack = '422';
  }
}
