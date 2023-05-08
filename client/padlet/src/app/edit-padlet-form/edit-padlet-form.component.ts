import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditPadletFormErrorMessages} from "./edit-padlet-form-error-messages";
import {Padlet} from "../shared/padlet";

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
  ) {
    this.editPadletForm = this.fb.group({});
  }

  ngOnInit() {
    // TODO: aktuelle UserId hinzufügen.
    const id:number = this.route.snapshot.params['id'];
    console.log('init', id);
    this.padletService.getSingle(id.toString()).subscribe(
      padlet => {
        this.padlet = padlet;
        this.padlet.id = id;
        console.log(this.padlet);
        this.initPadlet();
      }
    )
  }

  initPadlet() {
    this.editPadletForm = this.fb.group({
      name: [this.padlet.name, Validators.required],
      id: this.padlet.id,
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
      window.location.reload();
    })
    /*this.padletService.create(padlet).subscribe(res => {
      this.padlet = PadletFactory.empty();
      this.editPadletForm.reset(PadletFactory.empty());
      let currentUrl = this.router.url;
      console.log(currentUrl);
      window.location.reload();
    })*/
  }
}

