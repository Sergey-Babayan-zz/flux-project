import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPagination, IResponsePagination } from '@app/infrastructure/interfaces';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '../../services';
import { IUser } from '../../interfaces';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '@app/infrastructure/interfaces/response.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public editing: { [key: number]: boolean };
  public userList: IUser[];
  public loading = false;
  private ngUnsubscribe = new Subject();
  selected = [];
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dataInit();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private dataInit() {
    this.editing = {};
    this.getUserList();
  }

  private getUserList(): void {
    this.loading = true;
    this.userService.getUsers()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        (res: IResponse<IUser[]>) => {
          this.loading = false;
          if (res.success) {
            this.userList = res.data;
          }
        },
        err => { this.toastr.error(err.message); this.loading = false; }
      );
  }

  public openEdit(index: number, column: string) {
    this.editing[`${index}-${column}`] = true;
  }

  public updateData(event, data: IUser, index: number, column: string) {
    this.editing[`${index}-${column}`] = false;
    data[column] = event.target.value;
  }

  onSelect({ selected }) {

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  // add() {
  //   this.selected.push(this.rows[1], this.rows[3]);
  // }

  // update() {
  //   this.selected = [this.rows[1], this.rows[3]];
  // }

  remove() {
    this.selected = [];
  }

}
