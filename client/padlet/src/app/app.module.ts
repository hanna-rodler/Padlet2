import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletDetailComponent } from './padlet-detail/padlet-detail.component';
import { HomeComponent } from './home/home.component';
import {PadletService} from "./shared/padlet.service";
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import {HttpClientModule} from "@angular/common/http";
import { EntryFormComponent } from './entry-form/entry-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EntryComponent } from './entry/entry.component';

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletDetailComponent,
    HomeComponent,
    CommentModalComponent,
    EntryFormComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [PadletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
