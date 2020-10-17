import { NgModule } from '@angular/core';
import { LoginComponent, RegistrationComponent } from './components';
import { PublicRoutingModule } from './public.routing.module';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
