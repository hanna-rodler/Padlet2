import {FormControl} from "@angular/forms";
import {map, Observable} from "rxjs";
import {UserService} from "./user.service";
export class PadletValidators {
  static emailExists(userService: UserService): any {
    return function(control: FormControl):Observable<any> {
      return userService.getUserByEmail(control.value).pipe(map(user => {
        const isEmpty = Object.keys(user).length === 0;
        if(!isEmpty) {
          console.log('user', control.value, 'exists');
          return {emailExists: {valid: true}};
        } else {
          console.log('user', control.value, 'DOESN\'T exists');
          return null;
        }
      }));
    }
  }
}
