import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, IResponsePagination } from '@app/infrastructure/interfaces';
import { IResponse } from '@app/infrastructure/interfaces/response.interface';
import { userList } from '@app/infrastructure/mock/user.mock';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  protected getApiUrl(url): string {
    return `${environment.serverUrl + url}`;
  }

  public getUsers(): Observable<IResponse<IUser[]>> {
    const resp: IResponse<IUser[]> = {
      data: userList,
      status: 200,
      success: true
    };

    return of(resp).pipe(delay(2000));
    return this.http.get<IResponse<IUser[]>>(this.getApiUrl('api/login'));
  }
}
