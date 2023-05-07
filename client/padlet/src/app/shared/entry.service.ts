import { Injectable } from '@angular/core';
import {Entry, Comment, Rating} from "../shared/entry";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private api = "http://padlet.s2010456026.student.kwmhgb.at/api";
  // padlets: Padlet[];

  constructor(private http:HttpClient) {

  }

  create(entry: Entry): Observable<any> {
    return this.http.post(`${this.api}/padlets/${entry.padlet_id}/saveEntry`, entry).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:Error | any):Observable<any> {
    // eigentlich sinnvolle Errormeldung
    return throwError(error);
  }

}

