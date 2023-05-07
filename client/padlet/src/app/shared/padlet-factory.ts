import { Padlet } from './padlet';

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(0,'Hungry old kittens', false,0);
  }

  static fromObject(rawPadlet: any): Padlet {
  // TODO: add created_at und updated_at

    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.isPublic,
      rawPadlet.user_id,
      rawPadlet.entries
    )
  }

}
