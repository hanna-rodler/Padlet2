export class CommentFormErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string
  ) {


  }
}

export const CommentFormErrorMessages = [
  new CommentFormErrorMessage('text', 'required', 'Cannot save without adding a comment'),
];
