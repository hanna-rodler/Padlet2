import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PadletListComponent} from "./padlet-list/padlet-list.component";
import { PadletDetailComponent } from "./padlet-detail/padlet-detail.component";
import {HomeComponent} from "./home/home.component";
import {CommentComponent} from "./comment/comment.component";
import {EntryDetailComponent} from "./entry-detail/entry-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/padlets', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/:id', component: PadletDetailComponent},
  {path: 'padlets/entry/:id', component: EntryDetailComponent},
  {path: 'padlets/:id/entry/:entryId', component: EntryDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
