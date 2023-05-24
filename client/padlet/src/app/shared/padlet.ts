import { Entry } from "./entry";
import {User} from "./user";
import {Right} from "./right";
export { Entry } from "./entry";

export class Padlet {
  // TODO: created und updated nicht optional machen
  constructor(
    public id:number,
    public name:string,
    public isPublic:boolean,
    public user_id:number,
    public user: User,
    public created_at?: Date,
    public entries?: Entry[],
    public rights?: Right[],
    public updated_at?: Date,
    public updatedHrsAgo?: number,
  ) {
  }
}
