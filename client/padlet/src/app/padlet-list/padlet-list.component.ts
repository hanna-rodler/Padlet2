import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Padlet} from "../shared/padlet";
import { PadletService } from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  creatingPadlet = false;

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  constructor(private padletService: PadletService) {
  }
  ngOnInit() {
    this.padletService.getAllPublicPadlets().subscribe(
      res => {this.padlets = res}
    );
    // this.padlets = this.padletService.getAll();
  }

  cancel() {
    this.creatingPadlet = false;
  }

  createPadlet() {
    this.creatingPadlet = true;
  }

}
