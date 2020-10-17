import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { TokenInterceptor } from './interceptors';
import { PublicAuthGuard, AuthGuard } from './guards';
import { BroadcastService } from './services';


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
    BroadcastService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ]
})
export class CoreModule { }
