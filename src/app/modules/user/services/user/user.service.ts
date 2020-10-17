import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BroadcastService } from '@app/core/services';
import { IPagination, IResponsePagination } from '@app/infrastructure/interfaces';
import { IResponse } from '@app/infrastructure/interfaces/response.interface';
import { userList } from '@app/infrastructure/mock/user.mock';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces';

@Injectable()
export class UserService {
  private userList = [...userList];

  constructor(private http: HttpClient, private broadcastService: BroadcastService) {}

  protected getApiUrl(url): string {
    return `${environment.serverUrl + url}`;
  }

  public getUsers(): Observable<IResponse<IUser[]>> {
    const resp: IResponse<IUser[]> = {
      data: this.userList,
      status: 200,
      success: true
    };

    return of(resp).pipe(delay(2000));
  }

  public addUser(user: IUser): Observable<IResponse<IUser>> {
    const resp: IResponse<IUser> = {
      data: {...user, id: Number(new Date()).toString()},
      status: 200,
      success: true
    };

    return of(resp).pipe(delay(2000)).pipe(
      map(res => {
        this.userList.push(res.data);
        this.broadcastService.postMessage(this.userList);
        return res;
      })
    );
    // return this.http.post<IResponse<IUser>>(this.getApiUrl('users'));
  }

  public removeUsers(selectedIds: string[]): Observable<IResponse<IUser[]>> {
    return of(null).pipe(delay(500)).pipe(
      map(res => {
        this.userList = this.userList.filter(i => !selectedIds.includes(i.id));
        this.broadcastService.postMessage(this.userList);
        return {
          data: this.userList,
          status: 200,
          success: true
        };
      })
    );
    // return this.http.delete<IResponse<IUser>>(this.getApiUrl('users?selectedId=' + selectedIds'));
  }

  public updateUsers(users: IUser[]) {
    this.userList = users;
  }
}
