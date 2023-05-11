import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RatingService} from "../shared/rating.service";
import {RatingFactory} from "../shared/rating-factory";
import {RatingFormErrorMessages} from "./rating-form-error-messages";

@Component({
  selector: 'bs-rating-form',
  templateUrl: './rating-form.component.html',
  styles: [
  ]
})
export class RatingFormComponent implements OnInit {
  rating = RatingFactory.empty();

  ratingForm: FormGroup;

  errors: {[key:string]:string} = {};

  constructor(private fb: FormBuilder,
              private ratingService: RatingService,
              private route: ActivatedRoute,
  ) {
    this.ratingForm = this.fb.group({});
  }

  ngOnInit() {
    this.initPadlet();
  }

  initPadlet() {
    this.ratingForm = this.fb.group({
      stars: [null, [Validators.min(1), Validators.max(5)]],
    });
    this.ratingForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
  }

  updateErrorMessages() {
    this.errors = {};
    for(const message of RatingFormErrorMessages) {
      const control = this.ratingForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const rating = this.ratingForm.value;
    // TODO: user
    rating.user_id = 1;
    rating.entry_id = sessionStorage.getItem('entryId');
    console.log(rating);
    this.ratingService.create(rating).subscribe(res => {
      console.log('Result', res);
      this.rating = RatingFactory.empty();
      this.ratingForm.reset(RatingFactory.empty());
      window.location.reload();
    })
  }
}
