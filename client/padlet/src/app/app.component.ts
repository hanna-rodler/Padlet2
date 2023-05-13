import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  /*template: `<bs-padlet-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-padlet-list>
    <bs-padlet-detail *ngIf="detailsOn" [padlet]="padlet" (showListEvent)="showList()"></bs-padlet-detail>`,*/
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'padlet';

  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel() {
    if(this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }

/*  listOn = true;
  detailsOn = false;

  padlet: Padlet | undefined;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(padlet: Padlet) {
    this.listOn = false;
    this.detailsOn = true;
    this.padlet = padlet;
  }*/
}
