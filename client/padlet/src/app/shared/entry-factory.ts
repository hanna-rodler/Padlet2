import {Entry} from "./padlet";

export class EntryFactory {

  static empty(): Entry {
    return new Entry(0, '', '', 1, 1);
  }

  static fromObject(rawEntry: any) : Entry {
    return new Entry(
      rawEntry.id,
      rawEntry.title,
      rawEntry.text,
      rawEntry.padlet_id,
      rawEntry.user_id
    )
  }
}
