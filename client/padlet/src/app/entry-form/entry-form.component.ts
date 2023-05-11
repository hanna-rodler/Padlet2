import {Component, OnInit} from '@angular/core';
import {EntryFactory} from "../shared/entry-factory";
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";
import {EntryService} from "../shared/entry.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {EntryFormErrorMessages} from "./entry-form-error-messages";
import {Entry} from "../shared/entry";
import {Location} from '@angular/common';
import {PadletDetailComponent} from "../padlet-detail/padlet-detail.component";

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
              private location: Location
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
    console.log(this.isEditingEntry);
  }

  initEntry() {
    console.log('init', this.entry);
    this.entryForm = this.fb.group({
      padlet_id: this.entry.padlet_id,
      title: [this.entry.title, Validators.required],
      text: [this.entry.text, Validators.required],
      user_id: 1,
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
    console.log(this.entryForm.value);
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
    entry.id = this.entry.id;
    console.log('editing: ', this.isEditingEntry);
    console.log(entry);
    if (this.isEditingEntry) {
      this.entryService.update(entry).subscribe(res => {
        // this.router.navigate(["../../padlets", this.entry.padlet_id], {relativeTo: this.route});
        sessionStorage.removeItem('entryId');
        window.location.reload();
      });
    } else {
      this.entryService.create(entry).subscribe(res => {
        console.log('create', res);
        this.entry = EntryFactory.empty();
        this.entryForm.reset(EntryFactory.empty());
        let currentUrl = this.router.url;
        console.log(currentUrl);
        window.location.reload();
      })
    }
  }

  /*reload() {
    let currentUrl = this.router.url;
    let navigationExtras: NavigationExtras = {
      skipLocationChange: true
    };
    this.router.navigateByUrl(currentUrl, navigationExtras);
  }*/
}
