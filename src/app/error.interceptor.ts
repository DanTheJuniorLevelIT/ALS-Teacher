import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const route = inject(Router);

  return next(req).pipe(catchError((err:any)=>{
    if([401,403].includes(JSON.parse(err.status))){
      route.navigate(['login']);
    }

    const e = err.error.status || err.statusText

    return throwError (() => e);
  }))
};
