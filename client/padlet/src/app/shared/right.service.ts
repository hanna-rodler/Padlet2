import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Right} from "./right";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RightService {
  private api = "http://padlet.s2010456026.student.kwmhgb.at/api";
  constructor(private http:HttpClient,
              ) { }

  getPendingInvitations(userId:number): Observable<any> {
    return this.http.get(`${this.api}/pendingInvitations/${userId}`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  invite(invitation: Right): Observable<any> {
    return this.http.post(`${this.api}/invite`, invitation).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  acceptInvitation(invitation: any): Observable<any> {
    return this.http.put(`${this.api}/acceptInvitation/${invitation.user_id}/${invitation.padlet_id}`, invitation).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateRight(invitation: Right) {
    return this.http.put(`${this.api}/invitations/${invitation.user_id}/${invitation.padlet_id}`, invitation).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  declineInvitation(invitation: any): Observable<any> {
    return this.http.put(`${this.api}/declineInvitation/${invitation.user_id}/${invitation.padlet_id}`, invitation).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
}
