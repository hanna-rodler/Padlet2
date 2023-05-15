import {Padlet} from "./padlet";
import {User} from "./user";

export class Right {

  // delete is a reserved word that can't be used here -> changed all rights to canX
  constructor(
    public permission:string,
    public isInvitationPending:boolean,
    public isInvitationAccepted:boolean,
    public padlet_id:number,
    public user_id:number,
    public  padlet?: Padlet,
    public user?: User,
  ) {
  }
}
