import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentFactory} from "../shared/comment-factory";
import {CommentFormErrorMessages} from "./comment-form-error-messages";
import {CommentService} from "../shared/comment.service";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletRouterService} from "../shared/padlet-router.service";

@Component({
  selector: 'bs-comment-form',
  templateUrl: './comment-form.component.html',
  styles: [
  ]
})
export class CommentFormComponent implements OnInit {
  comment = CommentFactory.empty();

  commentForm: FormGroup;

  errors: {[key:string]:string} = {};

  constructor(private fb: FormBuilder,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private router: Router,
              private padletRouterServ: PadletRouterService
  ) {
    this.commentForm = this.fb.group({});
  }

  ngOnInit() {
      this.comment.entry_id = this.route.snapshot.params['id'];
      this.initPadlet();
  }

  initPadlet() {
    this.commentForm = this.fb.group({
      text: [this.comment.text, Validators.required],
      comment_id: this.comment.entry_id
    });
    this.commentForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
  }

  updateErrorMessages() {
    this.errors = {};
    for(const message of CommentFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const comment = this.commentForm.value;
    comment.user_id = this.authService.getCurrentUserId();
    comment.entry_id = sessionStorage.getItem('entryId');
    this.commentService.create(comment).subscribe(res => {
      this.comment = CommentFactory.empty();
      this.commentForm.reset(CommentFactory.empty());
      this.padletRouterServ.redirectTo(this.router.url);
    })
  }
}
