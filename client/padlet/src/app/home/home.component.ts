import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {RightService} from "../shared/right.service";
import {Right} from "../shared/right";

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
    private rightServ: RightService
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
          });
        }
      }
    });
  }

  isLoggedIn() {
    return this.authServ.isLoggedIn();
  }
}
