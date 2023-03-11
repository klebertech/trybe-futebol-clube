export default class InvalidParams extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidParams';
    this.stack = '401';
  }
}
