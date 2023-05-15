import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../shared/rating.service";
import {RatingFactory} from "../shared/rating-factory";
import {RatingFormErrorMessages} from "./rating-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletRouterService} from "../shared/padlet-router.service";

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
              private router: Router,
              private authService: AuthenticationService,
              private padletRouterServ: PadletRouterService,
  ) {
    this.ratingForm = this.fb.group({});
  }

  ngOnInit() {
    this.initRating();
  }

  initRating() {
    // TODO Achtung rating_id
    this.ratingForm = this.fb.group({
      rating_id: 0,
      stars: [null, [Validators.min(1), Validators.max(5), Validators.required]],
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
    rating.user_id = this.authService.getCurrentUserId();
    rating.entry_id = sessionStorage.getItem('entryId');
    this.ratingService.create(rating).subscribe(res => {
      this.rating = RatingFactory.empty();
      this.ratingForm.reset(RatingFactory.empty());
      this.padletRouterServ.redirectTo(this.router.url);
    })
  }
}
