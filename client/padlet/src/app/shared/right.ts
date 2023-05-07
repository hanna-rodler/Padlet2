export class Right {

  // delete is a reserved word that can't be used here -> changed all rights to canX
  constructor(
    public id:number,
    public canRead:boolean,
    public canCreate:boolean,
    public canUpdate:boolean,
    public canDelete:boolean,
    public padlet_id:boolean,
    public user_id:number
  ) {
  }
}
