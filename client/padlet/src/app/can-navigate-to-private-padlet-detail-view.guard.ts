import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToPrivatePadletDetailViewGuard implements CanActivate {
  constructor( private authService: AuthenticationService,
               private router: Router,
               private route: ActivatedRoute
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.canViewPrivatePadlet(route.params['id']).pipe(
      map(canView => {
        if (canView) {
          return true;
        } else {
          window.alert('Sorry, this is none of your padlets');
          this.router.navigate(['../']);
          return false;
        }
      })
    );
  }
}
