import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "./comment";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  api = 'http://padlet.s2010456026.student.kwmhgb.at/api';
  constructor(private http:HttpClient) { }

  create(comment: Comment): Observable<any> {
    return this.http.post(`${this.api}/comments/${comment.entry_id}`, comment).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
