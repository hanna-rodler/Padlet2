import { Injectable } from '@angular/core';
import { Padlet } from "./padlet";
import {Entry, Comment, Rating} from "../shared/entry";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class PadletService {
  private api = "http://padlet.s2010456026.student.kwmhgb.at/api";
  // padlets: Padlet[];

  constructor(private http:HttpClient) {

  }

  /*constructor() {
    this.padlets = [
      new Padlet(12, 'Anniversary', true, 1, [new Entry(7, 'Picnic in the park',
        'Enjoy a beautiful day outside with your significant other by having a picnic in a nearby park. Bring a blanket, your favorite snacks, and maybe even some board games to make the most of your time together.',
        12, 1, [
          new Comment(7, 'I love the idea of having a picnic in the park. It\'s so simple, but it can be really romantic. Plus, you can get some fresh air and enjoy some beautiful scenery together.',
            7, 2),
          new Comment(8, 'This is such a great idea! It\'s a low-key way to spend time together, but it still feels special. And you can bring whatever food and drinks you like, so it\'s totally customizable.', 7, 3)]),
      ]),
      new Padlet(13, 'Dating Ideas', true, 1,
        [new Entry(7, 'Picnic in the park',
          'Enjoy a beautiful day outside with your significant other by having a picnic in a nearby park. Bring a blanket, your favorite snacks, and maybe even some board games to make the most of your time together.',
          12, 1, [
            new Comment(7, 'I love the idea of having a picnic in the park. It\'s so simple, but it can be really romantic. Plus, you can get some fresh air and enjoy some beautiful scenery together.',
              7, 2),
            new Comment(8, 'This is such a great idea! It\'s a low-key way to spend time together, but it still feels special. And you can bring whatever food and drinks you like, so it\'s totally customizable.', 7, 3)]),
          new Entry(8, 'go swimming', '',12, 2, [], [new Rating(5, 8, 1), new Rating(3, 8, 2)]),
          new Entry(9, 'Wine and paint night', 'Take a class together where you can enjoy a glass of wine and learn how to paint. This is a great way to bond over a new experience and create something special to remember your date.', 12, 1),
          new Entry(10, 'Hiking or nature walk', 'Go for a hike or nature walk together and enjoy the great outdoors. This is a great way to get some exercise while also spending quality time together.', 12, 2,
            [
              new Comment(9, "I love going for hikes with my partner, it's such a great way to connect with each other and with nature. Plus, you can bring a picnic and make a whole day of it!", 10, 1),
              new Comment(10, "Nature walks are a great way to get some exercise and fresh air while enjoying each other's company. It's also a chance to explore new trails and see some beautiful scenery.", 10, 2),
              new Comment(11, "Going on a hike is one of my favorite date ideas because it's a great way to challenge ourselves and bond as a couple. Plus, you get to see some breathtaking views!", 10, 1),
              new Comment(11, 'Hiking is one of my favorite things to do with my partner. There\'s something about being in nature that just feels so peaceful and grounding. Plus, you get to explore new trails and maybe even discover some hidden gems.', 10,2)
            ], [new Rating(4, 10, 1), new Rating(5, 10, 1), new Rating(1, 10, 1)])
        ]),
    ]
  }*/

  // TODO: get private and public padlets, create, update, delete padlets
  getAllPublicPadlets(): Observable<Array<Padlet>> {
    const padlets =  this.http.get<Array<Padlet>>(`${this.api}/publicPadlets`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
    return padlets;
  }

  getSingle(strId: string): Observable<Padlet> {
    const id:number = Number(strId);
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet).pipe(retry(3))
    .pipe(catchError(this.errorHandler));
  }

  /*getAll() {
    this.padlets.forEach((padlet) => {
      padlet.strId = padlet.id.toString();
    })
    return this.padlets;
  }*/

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  update(padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    console.log('deleting padlet', id);
    return this.http.delete(`${this.api}/padlets/${id}`).pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  /*getSingle(strId: string) : Padlet {
    return <Padlet>this.padlets.find(padlet => padlet.strId === strId);
  }*/

}
