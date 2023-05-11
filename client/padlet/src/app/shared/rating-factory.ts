import {Rating} from "./rating";
import {User} from "./user";

export class RatingFactory {
  static empty(): Rating {
    return new Rating(3, 0, 0, new User(0, '', '', '', ''));
  }
}
