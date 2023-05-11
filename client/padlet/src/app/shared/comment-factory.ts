import {Comment} from "./comment";
import {User} from "./user";

export class CommentFactory {
  static empty(): Comment {
    return new Comment(0, '', 0, 0, new User(0, '', '', '', ''));
  }
}
