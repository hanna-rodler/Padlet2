export class RatingFormErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string
  ) {


  }
}

export const RatingFormErrorMessages = [
  new RatingFormErrorMessage('stars', 'min', 'Rating must be at least 1'),
  new RatingFormErrorMessage('stars', 'max', 'Rating can maximum be 5'),
];
