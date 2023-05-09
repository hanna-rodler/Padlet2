import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Padlet } from '../shared/padlet';
import { PadletService } from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Rating} from "../shared/rating";
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-padlet-detail',
  templateUrl: './padlet-detail.component.html',
  styles: [
  ]
})
export class PadletDetailComponent implements OnInit{
  padlet: Padlet = PadletFactory.empty();
  addingEntry = false;
  editingPadlet = false;
  showModal = false;

  constructor(
    private padletService: PadletService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    // this.padlet = this.padletService.getSingle(params['id']);
    this.padletService.getSingle(params['id']).subscribe(
      (p:Padlet) => {this.padlet = p; }
    );
  }

  addEntry() {
    this.addingEntry = true;
  }

  cancel() {
    this.addingEntry = false;
  }

  editPadlet() {
    this.editingPadlet = true;
    console.log('editing Padlet');
  }

  deletePadlet(id:number) {
    if (confirm('Do you really want to delete the padlet?')) {
      if (id !== undefined) {
        this.padletService.delete(id).subscribe(res => {
          /*this.router.navigate(['../'],
            {relativeTo: this.route});*/
          this.router.navigate(['../../padlets'],
            {relativeTo: this.route});
          this.toastr.success("The Entry was successfully deleted", "Deleted");}
        )
      }
      console.log('deleted Padlet');
    }
  }

}
