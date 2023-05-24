export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string
  ) {


  }
}

export const PadletFormErrorMessages = [
  new ErrorMessage('padletName', 'required', 'Please enter a name.'),
  new ErrorMessage('name', 'required', 'Please enter a padlet name.'),
  new ErrorMessage('email', 'emailExists', 'This email adress is not valid'),
];
