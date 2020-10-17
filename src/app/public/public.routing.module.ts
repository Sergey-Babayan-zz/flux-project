import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicAuthGuard } from '@core/guards';
import { LoginComponent, RegistrationComponent } from './components';

const routes: Routes = [
  {
    path: '', canActivateChild: [PublicAuthGuard],  children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
