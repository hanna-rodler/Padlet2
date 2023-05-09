import { Injectable } from '@angular/core';
import {Entry, Comment, Rating} from "../shared/entry";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Padlet} from "./padlet";
@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private api = "http://padlet.s2010456026.student.kwmhgb.at/api";
  // padlets: Padlet[];

  constructor(private http:HttpClient) {

  }

  getSingle(strId: string): Observable<Entry> {
    const id:number = Number(strId);
    return this.http.get<Entry>(`${this.api}/entries/${id}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(entry: Entry): Observable<any> {
    return this.http.post(`${this.api}/entries`, entry).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:Error | any):Observable<any> {
    // eigentlich sinnvolle Errormeldung
    return throwError(error);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(entry: Entry): Observable<any> {
    console.log(entry);
    return this.http.put(`${this.api}/entries/${entry.id}`, entry).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

}

