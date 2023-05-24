import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {RightService} from "../shared/right.service";
import {Right} from "../shared/right";
import {PadletRouterService} from "../shared/padlet-router.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  user: User | undefined;
  invitations: Array<Right> | undefined;

  constructor(
    private authServ: AuthenticationService,
    private rightServ: RightService,
    private router: Router,
    private padletRouterServ: PadletRouterService
  ) {
  }

  ngOnInit() {
    this.authServ.me().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (error) => {
        console.error(`Error: ${error}`);
      },
      complete: () => {
        if(this.user !== undefined && this.user.id !== undefined) {
          this.rightServ.getPendingInvitations(this.user.id).subscribe(res => {
            this.invitations = res;
            // console.log(this.invitations);
          });
        }
      }
    });
  }

  isLoggedIn() {
    return this.authServ.isLoggedIn();
  }

  acceptInvite(invitation: any) {
    console.log('accepting invite ', invitation);
    this.rightServ.acceptInvitation(invitation).subscribe(res => {
      this.padletRouterServ.redirectTo(this.router.url);
    })
  }

  declineInvite(invitation: Right) {
    this.rightServ.declineInvitation(invitation).subscribe(res => {
      // console.log(res);
      this.padletRouterServ.redirectTo(this.router.url);
    });
  }
}
