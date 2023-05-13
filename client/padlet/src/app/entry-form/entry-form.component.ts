import {Component, OnInit} from '@angular/core';
import {EntryFactory} from "../shared/entry-factory";
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {EntryService} from "../shared/entry.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {EntryFormErrorMessages} from "./entry-form-error-messages";
import {Entry} from "../shared/entry";
import {Location} from '@angular/common';
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: []
})
export class EntryFormComponent implements OnInit {
  entry: Entry = EntryFactory.empty();

  entryForm: FormGroup;
  isEditingEntry: boolean = false;

  errors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
              private entryService: EntryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private authService: AuthenticationService
  ) {
    this.entryForm = this.fb.group({});
  }

  ngOnInit() {
    // TODO: aktuelle UserId hinzufügen.
    const entryId = sessionStorage.getItem('entryId');
    if (entryId !== null) {
      this.isEditingEntry = true;
      this.entryService.getSingle(entryId).subscribe(entry => {
        this.entry = entry;
        this.initEntry();
      });
    } else {
      const padletId: number = this.route.snapshot.params['id'];
      this.entry.padlet_id = padletId;
      this.initEntry();
    }
    this.initEntry();
    console.log(this.isEditingEntry);
  }

  initEntry() {
    // TODO: richtige id setzen
    this.entryForm = this.fb.group({
      id: this.entry.id,
      padlet_id: this.entry.padlet_id,
      title: [this.entry.title, Validators.required],
      text: [this.entry.text, Validators.required],
    });
    this.entryForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of EntryFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
    entry.id = this.entry.id;
    let currentUrl = this.router.url;
    if (this.authService.isLoggedIn()){
      entry.user_id = this.authService.getCurrentUserId();
    } else {
      entry.user_id = 2;
    }
    if (this.isEditingEntry) {
      this.entryService.update(entry).subscribe(res => {
        sessionStorage.removeItem('entryId');
        this.redirectTo(currentUrl);
      });
    } else {
      this.entryService.create(entry).subscribe(res => {
        this.entry = EntryFactory.empty();
        this.entryForm.reset(EntryFactory.empty());
        let currentUrl = this.router.url;
        this.redirectTo(currentUrl);
      })
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  reload() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([this.router.url]));
  }
}
