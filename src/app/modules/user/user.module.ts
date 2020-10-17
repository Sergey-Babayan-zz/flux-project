import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent, UserListComponent } from './components';
import { UserService } from './services/user/user.service';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
