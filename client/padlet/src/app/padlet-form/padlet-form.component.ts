import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";
import {RightService} from "../shared/right.service";
import {Right} from "../shared/right";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})

export class PadletFormComponent implements OnInit {
  padlet = PadletFactory.empty();

  padletForm: FormGroup;

  errors: {[key:string]:string} = {};
  invitees: FormArray;

  constructor(private fb: FormBuilder,
              private padletService: PadletService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private rightsService : RightService,
              private userService: UserService
  ) {
    this.padletForm = this.fb.group({});
    this.invitees = this.fb.array([]);
  }

  ngOnInit() {
    this.initPadlet();
  }

  initPadlet() {
    this.buildInviteesArray();

    let isPublic = false;
    if(this.router.url === '/publicPadlets') {
      isPublic = true;
    }
    this.padletForm = this.fb.group({
      name: [this.padlet.name, Validators.required],
      isPublic: isPublic,
      id: this.padlet.id,
      invitees: this.invitees
    });
    this.padletForm.statusChanges.subscribe((res) => {
      this.updateErrorMessages();
    })
  }

  buildInviteesArray(){
    let fg = this.fb.group({
      id: new FormControl (0),
      email: new FormControl ('', [Validators.required, Validators.email]),
      permission: new FormControl('read', Validators.required)
    });
    this.invitees.push(fg);
  }

  updateErrorMessages() {
    this.errors = {};
    for(const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  canCreatePrivatePadlets() {
    return this.authService.isLoggedIn();
  }

  addInvitee() {
    this.invitees.push(this.fb.group({
        id: 0,
        email: ['', [Validators.required, Validators.email]],
        permission: ['read', Validators.required],
      })
    );
  }

  removeInvitee(index: number): void {
    this.invitees.removeAt(index);
  }

  submitForm() {
    const padlet:Padlet = PadletFactory.fromObject(this.padletForm.value);
    if (this.authService.isLoggedIn()){
      padlet.user_id = this.authService.getCurrentUserId();
    } else {
      padlet.isPublic = true;
      // Anonymus user has id 0
      padlet.user_id = 0;
    }
    // padlet.invitees = this.invitees.value;
    // console.log(this.invitees.value);
    this.padletService.create(padlet).subscribe(res => {
      // redirect user to either padlet or privatePadlet overview
      let padletView = '/publicPadlets'
      if(this.router.url === '/privatePadlets' && !padlet.isPublic && this.authService.isLoggedIn()) {
        padletView = '/privatePadlets';
      }
      this.router.navigate(['..'+padletView+'/'+res.id],
        {relativeTo: this.route});

      this.padletForm.value.invitees.forEach((invitee: any) => {
        this.userService.getUserByEmail(invitee.email).subscribe(user => {
          const right = new Right(invitee.permission, true, false, res.id, user.id)
          this.rightsService.invite(right).subscribe(res => {
            this.padlet = PadletFactory.empty();
            this.padletForm.reset(PadletFactory.empty());
          })
        });
      })
    });
  }
}

