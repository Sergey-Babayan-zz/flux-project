import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent, UserListComponent } from './components';
import { UserService } from './services/user/user.service';
import { SharedModule } from '@app/shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    NgbDatepickerModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
