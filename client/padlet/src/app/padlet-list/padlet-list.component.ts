import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Padlet} from "../shared/padlet";
import {Entry, Comment, Rating} from "../shared/entry";
import { PadletService } from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  constructor(private padletService: PadletService) {
  }
  ngOnInit() {
    this.padlets = this.padletService.getAll();
  }

}