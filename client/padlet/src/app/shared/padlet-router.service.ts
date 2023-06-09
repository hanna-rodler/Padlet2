import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PadletRouterService {

  constructor(
    private router: Router
  ) { }

  redirectTo(uri: string) {
    console.log('redirect');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
