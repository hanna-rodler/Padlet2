import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PadletListComponent} from "./padlet-list/padlet-list.component";
import { PadletDetailComponent } from "./padlet-detail/padlet-detail.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToLoggedInContentsGuard} from "./can-navigate-to-logged-in-contents.guard";
import {CanNavigateToPrivatePadletDetailViewGuard} from "./can-navigate-to-private-padlet-detail-view.guard";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'publicPadlets', component: PadletListComponent},
  {path: 'publicPadlets/:id', component: PadletDetailComponent},
  {path: 'privatePadlets/:id', component: PadletDetailComponent, canActivate: [CanNavigateToLoggedInContentsGuard, CanNavigateToPrivatePadletDetailViewGuard]},
  {path: 'privatePadlets', component: PadletListComponent, canActivate: [CanNavigateToLoggedInContentsGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'user/:userId', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [CanNavigateToLoggedInContentsGuard, CanNavigateToPrivatePadletDetailViewGuard]
})
export class AppRoutingModule { }
