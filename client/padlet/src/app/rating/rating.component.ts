import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "../shared/rating";

@Component({
  selector: 'div.bs-rating',
  templateUrl: './rating.component.html',
  styles: [
  ]
})
export class RatingComponent {
  @Input() rating: Rating | undefined;

  getRatingArray(num: number | undefined) {
    if (num !== undefined)
      return new Array(num);
    return new Array(0);
  }

  getRatingArray2(num: number | undefined) {
    if (num !== undefined)
      num = 5 - num;
      return new Array(num);
    return new Array(0);
  }

  getUser(id: number | undefined) {
    if(id !== undefined) {

    }
  }
}
