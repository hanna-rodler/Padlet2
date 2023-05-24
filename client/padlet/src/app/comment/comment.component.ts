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

  getUserLink(): string {
    if(this.comment !== undefined && this.comment.user !== undefined)
      return '../../user/'+this.comment.user.id;
    else
      return '';
  }
}
