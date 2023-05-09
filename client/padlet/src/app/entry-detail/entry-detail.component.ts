import {Component, OnInit} from '@angular/core';
import {Entry, Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EntryService} from "../shared/entry.service";
import {EntryFactory} from "../shared/entry-factory";

@Component({
  selector: 'bs-entry-detail',
  templateUrl: './entry-detail.component.html',
  styles: [
  ]
})
export class EntryDetailComponent implements OnInit {
  entry: Entry = EntryFactory.empty();

  constructor(

    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    // this.padlet = this.padletService.getSingle(params['id']);
    this.entryService.getSingle(params['id']).subscribe(
      (e:Entry) => {this.entry = e; }
    );
  }
}
