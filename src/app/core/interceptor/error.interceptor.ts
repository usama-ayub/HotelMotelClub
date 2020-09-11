import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService:AuthService, private commonService: CommonService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let error = ''
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                error = 'Session is Out, Login is required';
                this.commonService.error(error);
                this.authenticationService.logout();
                error = '';
            }
            if (err.status === 500 || err.status === 504) {
                // auto logout if 401 response returned from api
                error = 'Please Connect your Internet ';
                this.commonService.error(error);
                console.log(error)
                this.authenticationService.logout();
                error = '';
            }
            return throwError(error);
        }))
    }
}