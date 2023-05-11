import { Comment } from "./comment";
import {Rating} from "./rating";
import {User} from "./user";

export { Comment } from "./comment";
export {Rating} from "./rating";
export class Entry {
  constructor(
    public id:number,
    public title:string,
    public text:string,
    public padlet_id:number,
    public user_id:number,
    public user: User,
    public comments?: Comment[],
    public ratings?: Rating[],
    public image?:string,
  ) {
  }
}
