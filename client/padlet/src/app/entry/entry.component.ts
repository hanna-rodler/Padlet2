import {Component, Input, OnInit} from '@angular/core';
import {Entry, Rating} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {EntryService} from "../shared/entry.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {RatingService} from "../shared/rating.service";

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
              private router: Router,
              private route: ActivatedRoute) {
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
          window.location.reload();
          /*let currentUrl = this.router.url;
          let navigationExtras: NavigationExtras = {
            skipLocationChange: true
          };
          this.router.navigateByUrl(currentUrl);*/
          this.toastr.success("The Entry was successfully deleted", "Deleted");}
        )
      }
      console.log('delete Entry');
    }
  }

  editEntry(){
    this.editingEntry = true;
  }

  addEntryId(id: number | undefined) {
    if(id !== undefined) {
      sessionStorage.setItem('entryId', id.toString());
      // TODO: aktuelle User Id nehmen.
      this.ratingService.ratingExists(id.toString(), 1).subscribe(res => {
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
