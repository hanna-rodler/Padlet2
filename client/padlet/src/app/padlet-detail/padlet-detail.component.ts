import {Component, OnInit } from '@angular/core';
import { Padlet } from '../shared/padlet';
import { PadletService } from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import { ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: [
  ]
})
export class PadletDetailComponent implements OnInit{
  padlet: Padlet = PadletFactory.empty();
  addingEntry:boolean = false;
  editingPadlet:boolean = false;
  isPadletOwner:boolean = false;
  permission:string = '';
  isAnonymUser:boolean = false;
  padletView: string = '/publicPadlets';
  backButtonText: string = 'back to public padlets';


  constructor(
    private padletService: PadletService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    sessionStorage.removeItem('entryId');
    const params = this.route.snapshot.params;
    this.padletService.getSingle(params['id']).subscribe(
      (p:Padlet) => {
        this.padlet = p;
        if(this.authService.isLoggedIn()) {
          this.authService.me().subscribe(me => {
            if(this.padlet.user_id === me.id) {
              this.isPadletOwner = true;
            } else if(this.padlet.rights !== undefined) {
              const filteredRights = this.padlet.rights.filter((right) => right.user_id === me.id);
              // console.log('filtered Rights', filteredRights[0]);
              this.permission = filteredRights[0].permission;
              // console.log('Permission:',this.permission);
            }
          });
        } else if(this.padlet.isPublic && this.authService.isLoggedOut()) {
          this.permission = 'read';
          this.isAnonymUser = true;
        }
      }
    );
    let regExPrivateView = /\/privatePadlets\/\d+/;
    if(regExPrivateView.test(this.router.url) && this.authService.isLoggedIn()) {
      this.padletView = '/privatePadlets';
      this.backButtonText = 'back to my padlets';
    }
  }


  getPermissions(){
    return this.permission;
  }

  addEntry() {
    this.addingEntry = true;
  }

  cancel() {
    this.addingEntry = false;
  }

  editPadlet() {
    this.editingPadlet = true;
  }

  deletePadlet(id:number) {
    if (confirm('Do you really want to delete the padlet?')) {
      if (id !== undefined) {
        this.padletService.delete(id).subscribe(res => {
          this.router.navigate(['../../'+this.padletView],
            {relativeTo: this.route});
          this.toastr.success("The Entry was successfully deleted", "Deleted");}
        )
      }
    }
  }

}
