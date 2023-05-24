import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
import {PadletService} from "./padlet.service";
import {Observable} from "rxjs";
import {Padlet} from "./padlet";
import { map } from 'rxjs/operators';

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = 'http://padlet.s2010456026.student.kwmhgb.at/api/auth';

  constructor(private http:HttpClient,
              private userServ:UserService,
              private route: ActivatedRoute,
              private padletService: PadletService
              ) {

  }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {email: email, password: password});
  }

  me() {
    const userId = this.getCurrentUserId();
    return this.userServ.getUser(userId);
  }

  logout(){
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem('userId'));
  }

  public isLoggedIn():boolean{
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date();
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()) {
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    }
    return false;
  }

  canViewPrivatePadlet(padletId: string): Observable<boolean> {
    const id = parseInt(padletId);
    console.log('padletId', id, '\nuser id', this.getCurrentUserId());

    return this.padletService.getPrivatePadlets(this.getCurrentUserId()).pipe(
      map(padlets => {
        console.log(padlets);
        const matchingPadlet = padlets.find(padlet => padlet.id === id);
        console.log('matchingPadlet', matchingPadlet);
        return !!matchingPadlet;
      })
    );
  }


  public setSessionStorage(token:string) {
    sessionStorage.setItem("token", token);
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }
}
