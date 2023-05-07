import {Component, Input, OnInit} from '@angular/core';
import {Entry, Rating} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {EntryService} from "../shared/entry.service";

@Component({
  selector: 'div.bs-entry',
  templateUrl: './entry.component.html',
  styles: [
  ]
})
export class EntryComponent {
  @Input() entry: Entry | undefined;

  getRating(ratings: Array<Rating> | undefined ): number {
    if (ratings !== undefined && ratings.length > 0) {
      console.log(ratings);
      const sum = ratings.reduce((total, rating) => total + rating.stars, 0);
      const avg = Number((sum / ratings.length).toFixed(2));
      return avg;
    } else return 0;
  }

  getNumComments(comments: any): number {
    if(comments !== undefined) {
      return comments.length;
    }
    return 0;
  }
}
