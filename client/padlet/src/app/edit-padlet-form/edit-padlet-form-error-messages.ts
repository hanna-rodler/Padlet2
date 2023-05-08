export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string
  ) {


  }
}

export const EditPadletFormErrorMessages = [
  new ErrorMessage('padletName', 'required', 'Please enter a name.'),
  new ErrorMessage('name', 'required', 'Please enter a padlet name.'),
];
