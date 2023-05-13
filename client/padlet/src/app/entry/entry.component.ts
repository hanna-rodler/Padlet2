import {Component, Input, OnInit} from '@angular/core';
import {Entry, Rating} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {EntryService} from "../shared/entry.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RatingService} from "../shared/rating.service";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletRouterService} from "../shared/padlet-router.service";

@Component({
  selector: 'div.bs-entry',
  templateUrl: './entry.component.html',
  styles: [
  ]
})
export class EntryComponent {
  @Input() entry: Entry | undefined;
  editingEntry:boolean = false;
  showModal:boolean = false;
  ratingExists:boolean = false;

  constructor(private entryService: EntryService,
              private ratingService: RatingService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private padletRouterServ: PadletRouterService
              ) {
  }

  getRating(ratings: Array<Rating> | undefined ): number {
    if (ratings !== undefined && ratings.length > 0) {
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

  deleteEntry(id:number | undefined) {
    if (confirm('Do you really want to delete the entry?')) {
      if (id !== undefined) {
        this.entryService.delete(id).subscribe(res => {
          this.padletRouterServ.redirectTo(this.router.url);
          this.toastr.success("The Entry was successfully deleted", "Deleted");}
        )
      }
    }
  }

  editEntry(){
    this.editingEntry = true;
  }

  addEntryId(id: number | undefined) {
    if(id !== undefined) {
      sessionStorage.setItem('entryId', id.toString());
      // TODO: aktuelle User Id nehmen.
      const user = this.authService.getCurrentUserId();
      this.ratingService.ratingExists(id.toString(), user).subscribe(res => {
        if(res.length === 0){
          this.ratingExists = false;
        } else {
          this.ratingExists = true;
        }
      });
    }
  }

  removeEntryId() {
    sessionStorage.removeItem('entryId');
    this.ratingExists = false;
    this.editingEntry = false
  }
}
