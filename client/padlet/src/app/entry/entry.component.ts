import {Component, Input, OnInit} from '@angular/core';
import {Entry, Rating} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {EntryService} from "../shared/entry.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'div.bs-entry',
  templateUrl: './entry.component.html',
  styles: [
  ]
})
export class EntryComponent {
  @Input() entry: Entry | undefined;

  constructor(private entryService: EntryService,
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

  openComments() {
    console.log('open Comments');
  }

  openEntryDetailView() {
    console.log('entry detail');
    this.toastr.success("The Entry was successfully deleted", "Deleted");

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
}
