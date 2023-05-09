export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string
  ) {


  }
}

export const EntryFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Please enter a title.'),
  new ErrorMessage('text', 'required', 'Please enter a text.'),
];
