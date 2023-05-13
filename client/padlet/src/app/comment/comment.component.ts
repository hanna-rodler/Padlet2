import { Component, Input } from '@angular/core';
import { Comment} from "../shared/entry";


@Component({
  selector: 'div.bs-comment',
  templateUrl: './comment.component.html',
  styles: [
  ]
})
export class CommentComponent {
  @Input() comment: Comment | undefined;

}
