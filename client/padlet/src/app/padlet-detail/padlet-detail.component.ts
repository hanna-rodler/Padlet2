import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Padlet } from '../shared/padlet';
import { PadletService } from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Rating} from "../shared/rating";
import {PadletFactory} from "../shared/padlet-factory";

@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: [
  ]
})
export class PadletDetailComponent implements OnInit{
  padlet: Padlet = PadletFactory.empty();
  addingEntry = false;

  constructor(
    private padletService: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    // this.padlet = this.padletService.getSingle(params['id']);
    this.padletService.getSingle(params['id']).subscribe(
      (p:Padlet) => {this.padlet = p; }
    );
  }

  addEntry() {
    this.addingEntry = true;
  }

}
