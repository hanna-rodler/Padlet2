import { Entry } from "./entry";
export { Entry } from "./entry";

export class Padlet {
  constructor(
    public id:number,
    public name:string,
    public isPublic:boolean,
    public user_id:number,
    public entries?: Entry[],
    public strId?:string,
  ) {
  }
}
