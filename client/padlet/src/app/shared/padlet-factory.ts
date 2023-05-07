import { Padlet } from './padlet';

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(0,'', false,0);
  }

  // TODO: add created_at und updated_at

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.isPublic,
      rawPadlet.user_id,
    )
  }

}
