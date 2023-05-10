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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { EditPadletFormComponent } from './edit-padlet-form/edit-padlet-form.component';
import { PadletFormComponent } from './padlet-form/padlet-form.component';
import { CommentComponent } from './comment/comment.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import {SemanticUiModule} from "@mantic-ui/semantic-ui-angular";
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletDetailComponent,
    HomeComponent,
    CommentModalComponent,
    EntryFormComponent,
    EntryComponent,
    EditPadletFormComponent,
    PadletFormComponent,
    CommentComponent,
    EntryDetailComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    SemanticUiModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [PadletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
