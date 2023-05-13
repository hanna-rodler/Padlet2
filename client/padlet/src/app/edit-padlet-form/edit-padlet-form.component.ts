import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditPadletFormErrorMessages} from "./edit-padlet-form-error-messages";
import {Padlet} from "../shared/padlet";
import {PadletRouterService} from "../shared/padlet-router.service";

@Component({
  selector: 'bs-edit-padlet-form',
  templateUrl: './edit-padlet-form.component.html',
  styles: [
  ]
})
export class EditPadletFormComponent implements OnInit {
  padlet = PadletFactory.empty();

  editPadletForm: FormGroup;

  errors: {[key:string]:string} = {};

  constructor(private fb: FormBuilder,
              private padletService: PadletService,
              private route: ActivatedRoute,
              private router: Router,
              private padletRouterServ: PadletRouterService,
  ) {
    this.editPadletForm = this.fb.group({});
  }

  ngOnInit() {
    // TODO: aktuelle UserId hinzufügen.
    const id:number = this.route.snapshot.params['id'];
    this.padletService.getSingle(id.toString()).subscribe(
      padlet => {
        this.padlet = padlet;
        this.padlet.id = id;
        console.log(this.padlet);
        this.initPadlet();
      }
    );
    this.initPadlet();
  }

  initPadlet() {
    this.editPadletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
    });
    this.editPadletForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
  }

  updateErrorMessages() {
    this.errors = {};
    for(const message of EditPadletFormErrorMessages) {
      const control = this.editPadletForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    console.log(this.editPadletForm.value);
    const padlet:Padlet = PadletFactory.fromObject(this.editPadletForm.value);
    this.padletService.update(padlet).subscribe(res => {
      this.padletRouterServ.redirectTo(this.router.url);
    })
  }
}

