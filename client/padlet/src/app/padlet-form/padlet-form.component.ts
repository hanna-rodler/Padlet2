import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";

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

  constructor(private fb: FormBuilder,
              private padletService: PadletService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
  ) {
    this.padletForm = this.fb.group({});
  }

  ngOnInit() {
    this.initPadlet();
  }

  initPadlet() {
    this.padletForm = this.fb.group({
      name: [this.padlet.name, Validators.required],
      isPublic: this.padlet.isPublic,
      id: this.padlet.id,
    });
    this.padletForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
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

  submitForm() {
    const padlet:Padlet = PadletFactory.fromObject(this.padletForm.value);
    if (this.authService.isLoggedIn()){
      padlet.user_id = this.authService.getCurrentUserId();
    } else {
      padlet.isPublic = true;
      padlet.user_id = 2;
    }
    this.padletService.create(padlet).subscribe(res => {
      this.router.navigate(['../padlets/'+res.id],
        {relativeTo: this.route});
      this.padlet = PadletFactory.empty();
      this.padletForm.reset(PadletFactory.empty());
    });
  }
}

