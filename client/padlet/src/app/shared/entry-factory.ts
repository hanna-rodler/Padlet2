import {Entry} from "./padlet";
import {User} from "./user";

export class EntryFactory {

  static empty(): Entry {
    return new Entry(0, '', '', 1, 1, new User(0,'', '', '', ''));
  }

  static fromObject(rawEntry: any) : Entry {
    return new Entry(
      rawEntry.id,
      rawEntry.title,
      rawEntry.text,
      rawEntry.padlet_id,
      rawEntry.user_id,
      rawEntry.user
    )
  }
}
