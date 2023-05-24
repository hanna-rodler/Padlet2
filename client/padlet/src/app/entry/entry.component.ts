import {Component, Input, OnInit} from '@angular/core';
import {Entry, Rating} from "../shared/entry";
import {EntryService} from "../shared/entry.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../shared/rating.service";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletRouterService} from "../shared/padlet-router.service";

@Component({
  selector: 'div.bs-entry',
  templateUrl: './entry.component.html',
  styles: [
  ]
})
export class EntryComponent implements OnInit {
  @Input() entry: Entry | undefined;
  @Input() permission: string | undefined;
  @Input() isAnonymUser: boolean | undefined;
  // @Input() rights: Array<Right> | undefined;
  editingEntry:boolean = false;
  showModal:boolean = false;
  ratingExists:boolean = false;
  canDelete = false;
  isEntryOwner = false;

  constructor(private entryService: EntryService,
              private ratingService: RatingService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private padletRouterServ: PadletRouterService
              ) {
  }

  ngOnInit() {
    if (this.entry !== undefined){
      this.authService.me().subscribe(me => {
        if(this.entry !== undefined) {
          if (this.entry.user_id === me.id) {
            // console.log('is entry owner', this.entry.user_id, 'of ', this.entry.id);
            this.isEntryOwner = true;
          }
        }
      });
    }
  }

  getRating(ratings: Array<Rating> | undefined ): number {
    if (ratings !== undefined && ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating.stars, 0);
      return Number((sum / ratings.length).toFixed(2));
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
      const user = this.authService.getCurrentUserId();
      this.ratingService.ratingExists(id.toString(), user).subscribe(res => {
        this.ratingExists = res.length !== 0;
      });
    }
  }

  removeEntryId() {
    sessionStorage.removeItem('entryId');
    this.ratingExists = false;
    this.editingEntry = false
  }

  getUserLink(): string {
    if(this.entry !== undefined && this.entry.user !== undefined)
      return '../../user/'+this.entry.user.id;
    else
      return '';
  }
}
