import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent, UserListComponent } from './components';
import { UserService } from './services/user/user.service';



@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
