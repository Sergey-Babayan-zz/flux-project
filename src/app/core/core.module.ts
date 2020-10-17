import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { TokenInterceptor } from './interceptors';
import { PublicAuthGuard, AuthGuard } from './guards';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    PublicAuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ]
})
export class CoreModule { }
