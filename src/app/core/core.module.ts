import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS,HttpClient, HttpClientModule} from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ApiPrefixInterceptor } from './interceptor/api-prefix.interceptor';
import { AuthGuard } from './guard/auth/auth.guard';
import { NoAuthGuard } from './guard/no-auth/no-auth.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
})
export class CoreModule { }
