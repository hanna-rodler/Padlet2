import {User} from "./user";

export class Comment {
  constructor(
    public id:number,
    public text:string,
    public entry_id:number,
    public user_id:number,
    public user: User
  ) {
  }
}
