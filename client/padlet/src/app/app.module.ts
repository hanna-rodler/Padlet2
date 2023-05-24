import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PadletListComponent} from './padlet-list/padlet-list.component';
import {PadletDetailComponent} from './padlet-detail/padlet-detail.component';
import {HomeComponent} from './home/home.component';
import {PadletService} from "./shared/padlet.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EntryFormComponent} from './entry-form/entry-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {EntryComponent} from './entry/entry.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {EditPadletFormComponent} from './edit-padlet-form/edit-padlet-form.component';
import {PadletFormComponent} from './padlet-form/padlet-form.component';
import {CommentComponent} from './comment/comment.component';
import {SemanticUiModule} from "@mantic-ui/semantic-ui-angular";
import {RatingComponent} from './rating/rating.component';
import {CommentFormComponent} from './comment-form/comment-form.component';
import {RatingFormComponent} from './rating-form/rating-form.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {EntryService} from "./shared/entry.service";
import {CommentService} from "./shared/comment.service";
import {RatingService} from "./shared/rating.service";
import {UserService} from "./shared/user.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import { PrivatePadletsComponent } from './private-padlets/private-padlets.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletDetailComponent,
    HomeComponent,
    EntryFormComponent,
    EntryComponent,
    EditPadletFormComponent,
    PadletFormComponent,
    CommentComponent,
    RatingComponent,
    CommentFormComponent,
    RatingFormComponent,
    LoginComponent,
    PrivatePadletsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    SemanticUiModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    PadletService,
    EntryService, CommentService, RatingService, UserService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
