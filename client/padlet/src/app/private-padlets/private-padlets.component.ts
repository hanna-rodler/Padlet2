import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-private-padlets',
  templateUrl: './private-padlets.component.html',
  styles: [
  ]
})
export class PrivatePadletsComponent implements OnInit {
  padlets: Padlet[] = [];
  creatingPadlet = false;
  permission = 'read';

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  constructor(private padletService: PadletService,
              private authService: AuthenticationService) {
  }
  ngOnInit() {
    const userId = this.authService.getCurrentUserId();
    this.padletService.getPrivatePadlets(userId).subscribe(
      res => {this.padlets = res;}
    );
  }

  cancel() {
    this.creatingPadlet = false;
  }

  createPadlet() {
    this.creatingPadlet = true;
  }

}
