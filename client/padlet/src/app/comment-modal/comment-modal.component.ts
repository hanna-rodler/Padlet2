import { Component, AfterViewInit } from '@angular/core';

declare var semantic: {
  modal: any
};

@Component({
  selector: 'bs-comment-modal',
  templateUrl: './comment-modal.component.html',
  styles: [
  ]
})
export class CommentModalComponent implements AfterViewInit {
  modal: any;

  constructor() {
    const modalElement = document.querySelector('#myModal');
    this.modal = new semantic.modal(modalElement);
  }

  ngAfterViewInit() {
    this.modal.show();
  }
}
