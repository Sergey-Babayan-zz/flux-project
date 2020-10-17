import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPagination, IResponsePagination } from '@app/infrastructure/interfaces';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '../../services';
import { IUser } from '../../interfaces';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '@app/infrastructure/interfaces/response.interface';
import { RequiredValidator } from '@app/infrastructure/validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BroadcastService } from '@app/core/services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public editing: { [key: number]: boolean };
  public userList: IUser[];
  public loading = false;
  public form: FormGroup;
  private ngUnsubscribe = new Subject();
  public selected = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private broadcastService: BroadcastService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userDataWatcher();
    this.dataInit();
    this.initForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private userDataWatcher() {
    this.broadcastService.userData.subscribe((res: IUser[]) => {
      this.userList = res || [];
      this.userService.updateUsers(this.userList);
    });
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
          this.selected = [];
          if (res.success) {
            this.userList = [...res.data];
          }
        },
        err => { this.toastr.error(err.message); this.loading = false; this.selected = []; }
      );
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstname: [null, [RequiredValidator.validate]],
      lastname: [null, [RequiredValidator.validate]],
      birthdate: [null, [RequiredValidator.validate]]
    });
  }

  public addToTable() {
    this.loading = true;
    this.userService.addUser(this.form.value)
      .subscribe(
        res => {
          this.getUserList();
        },
        error => {this.toastr.error('ERROR'); this.loading = false; }
      );
  }

  public appendDate({day, month, year}) {
    const newDate = new Date(year, month - 1, day).toUTCString();
    this.form.get('birthdate').setValue(newDate);
  }

  public resetForm() {
    this.form.reset();
  }

  public removeBulk() {
    const selectedIds = this.selected.map(i => i.id);
    this.userService.removeUsers(selectedIds)
    .subscribe(res => {
      this.getUserList();
    });
  }

  public openEdit(index: number, column: string) {
    this.editing[`${index}-${column}`] = true;
  }

  public updateData(event, data: IUser, index: number, column: string) {
    this.editing[`${index}-${column}`] = false;
    data[column] = event.target.value;
    this.broadcastService.postMessage(this.userList);
  }

  onSelect({ selected }) {
    this.selected = [];
    if (selected) {
      this.selected.push(...selected);
    }
  }

}
