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
import {PadletRouterService} from "../shared/padlet-router.service";

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
  isUpdating: boolean = false;
  isPadletOwner: boolean = false;


  constructor(private fb: FormBuilder,
              private padletService: PadletService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private rightsService : RightService,
              private userService: UserService,
              private padletRouterServ: PadletRouterService,
  ) {
    this.padletForm = this.fb.group({});
    this.invitees = this.fb.array([])
  }

  ngOnInit() {
    const id:number = this.route.snapshot.params['id'];
    if(id !== undefined) {
      this.isUpdating = true;
      this.padletService.getSingle(id.toString()).subscribe(
        padlet => {
          this.padlet = padlet;
          this.padlet.id = id;
          this.initPadlet();
          this.checkPadletOwner();
        }
      );
    }
    this.initPadlet();
  }

  initPadlet() {
    this.buildInviteesArray();

    let isPublic = false;
    if(this.router.url === '/publicPadlets') {
      isPublic = true;
    }
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      isPublic: isPublic,
      invitees: this.invitees
    });
    this.padletForm.statusChanges.subscribe((res) => {
      this.updateErrorMessages();
    })
  }

  checkPadletOwner(){
    this.authService.me().subscribe(me => {
      if (this.padlet.user_id == me.id) {
        console.log('is Padlet owner');
        this.isPadletOwner = true;
      }
    });
  }

  buildInviteesArray(){
    console.log('building invitees array');
    if(this.padlet.rights) {
      console.log('getting rights');
      this.invitees = this.fb.array([]);
      for (let right of this.padlet.rights) {
        if(right.user !== undefined) {
          console.log(right.user);
          let fg = this.fb.group({
            id: right.user_id,
            email: [right.user.email, [Validators.email]],
            permission: [right.permission],
            isInvitationPending: right.isInvitationPending,
            isInvitationAccepted: right.isInvitationAccepted
          });
          this.invitees.push(fg);
        }
      }
    } else {
      let fg = this.fb.group({
        id: new FormControl (0),
        email: new FormControl ('', [Validators.email]),
        permission: new FormControl('read')
      });
      this.invitees.push(fg);
    }
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
        email: ['', [Validators.email]],
        permission: ['read', Validators.required],
      })
    );
  }

  removeInvitee(index: number): void {
    this.invitees.removeAt(index);
  }

  submitForm() {
    this.padletForm.value.invitees = this.padletForm.value.invitees.filter(
      (invitee: {email:string}) => invitee.email !== ''
    );
    console.log('invitees', this.padletForm.value.invitees);



    if(this.isUpdating) {
      const padlet:Padlet = PadletFactory.fromObject(this.padletForm.value);
      this.padletService.update(padlet).subscribe(res => {
        console.log(res);
        this.padletForm.value.invitees.forEach((invitee: any) => {
          this.userService.getUserByEmail(invitee.email).subscribe(user => {
            console.log(invitee.isInvitationPending);
            const isInvitationPending = invitee.isInvitationPending !== undefined ? invitee.isInvitationPending : true;
            const isInvitationAccepted = invitee.isInvitationAccepted !== undefined ? invitee.isInvitationAccepted : false;
            const right = new Right(invitee.permission, isInvitationPending, isInvitationAccepted, padlet.id, user.id)
            this.rightsService.invite(right).subscribe(res => {
              this.padlet = PadletFactory.empty();
              this.padletForm.reset(PadletFactory.empty());
            })
          });
        })
        this.padletRouterServ.redirectTo(this.router.url);
      })
    } else {
      const padlet:Padlet = PadletFactory.fromObject(this.padletForm.value);
      if (this.authService.isLoggedIn()){
        padlet.user_id = this.authService.getCurrentUserId();
      } else {
        padlet.isPublic = true;
        // Anonymus user has id 5
        padlet.user_id = 5;
      }
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

  cancel() {
    this.padletRouterServ.redirectTo(this.router.url);
  }
}

