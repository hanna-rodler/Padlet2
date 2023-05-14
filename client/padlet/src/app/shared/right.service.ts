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
    return this.http.get(`${this.api}/invitation/${userId}`)
    .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
