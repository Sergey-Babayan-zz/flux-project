import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BroadcastService {
  private broadcastUserList = new BroadcastChannel('users');
  public userData = new Subject();
  constructor() {
    this.broadcastUserList.onmessage = res => this.userData.next(res.data);
  }

  public postMessage(message) {
    this.broadcastUserList.postMessage(message);
  }

}
