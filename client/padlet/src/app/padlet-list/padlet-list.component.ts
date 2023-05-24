import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Padlet} from "../shared/padlet";
import { PadletService } from "../shared/padlet.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  creatingPadlet: boolean = false;
  privateView:boolean = false;

  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  constructor(private padletService: PadletService,
              private router: Router,
              private authService: AuthenticationService

  ) {
  }
  ngOnInit() {
    let regExPrivateView = /\/privatePadlets/;
    if(regExPrivateView.test(this.router.url)) {
      this.privateView = true;
      const userId = this.authService.getCurrentUserId();
      this.padletService.getPrivatePadlets(userId).subscribe(
        res => {this.padlets = res;}
      );
    } else {
      this.privateView = false;
      this.padletService.getAllPublicPadlets().subscribe(
        res => {this.padlets = res}
      );
    }
  }

  cancel() {
    this.creatingPadlet = false;
  }

  createPadlet() {
    this.creatingPadlet = true;
  }

  getPadletListHeading(): string {
    if(this.privateView) {
      return 'Private Padlets';
    }
    return 'Padlets';
  }

}
