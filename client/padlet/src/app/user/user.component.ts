import {Component, OnInit} from '@angular/core';
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import { Location } from '@angular/common';

@Component({
  selector: 'bs-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  user: User = new User(0, '', '', '');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) {
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.userService.getUser(params['userId']).subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
