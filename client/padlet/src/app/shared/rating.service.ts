import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Rating} from "./rating";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  api = 'http://padlet.s2010456026.student.kwmhgb.at/api';
  constructor(private http:HttpClient) { }

  create(rating: Rating): Observable<any> {
    return this.http.post(`${this.api}/ratings`, rating).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  ratingExists(entryId: string, userId: number): Observable<any> {
    return this.http.get(`${this.api}/ratings/${entryId}/${userId}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }
}
