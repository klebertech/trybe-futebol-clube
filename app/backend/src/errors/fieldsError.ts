export default class FieldsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'fieldsError';
    this.stack = '400';
  }
}
