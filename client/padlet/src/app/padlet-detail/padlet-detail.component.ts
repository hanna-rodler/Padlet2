import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Padlet } from '../shared/padlet';
import { PadletService } from "../shared/padlet.service";
import {ActivatedRoute} from "@angular/router";
import {Rating} from "../shared/rating";

@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: [
  ]
})
export class PadletDetailComponent implements OnInit{
  padlet: Padlet | undefined

  constructor(
    private ps: PadletService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.padlet = this.ps.getSingle(params['id']);
  }

  getRating(ratings: Array<Rating>): number {
    const sum = ratings.reduce((total, rating) => total + rating.stars, 0);
    const avg = Number((sum / ratings.length).toFixed(2));
    console.log(ratings);
    return avg;
  }

  getNumComments(comments: any): number {
    if(comments !== undefined) {
      return comments.length;
    }
    return 0;
  }

}
