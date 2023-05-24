import {User} from "./user";

export class Rating {
  constructor(
    public stars:number,
    public entry_id:number,
    public user_id:number,
    public user: User,
    public created_at?: Date
  ) {
  }

}
