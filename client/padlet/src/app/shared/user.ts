export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public image?: string,
    public created_at?: Date
  ) {
  }
}
