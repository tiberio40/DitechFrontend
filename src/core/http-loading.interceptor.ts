import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    return next.handle(request).pipe(catchError(err => {
      console.log()
      if (err.status >= 400 && err.status < 500) {
        let message: string = '';

        if(err.error.hasOwnProperty('message')){
          message = err.error.message;
        }else if (Object.keys(err.error).length > 0){

          Object.keys(err.error).forEach(key => {
            err.error[key].forEach((element: string) => {
              message += " - " + element + "\n";
            });
          })
        } else {
          message = 'Algo ha ido mal, vuele a intentarlo más tarde o contacta con el administrador';
        }


        Swal.fire(
          'Atención!',
          message,
          'error'
        );
      }

      if (err.status >= 500 && err.status < 600) {
        Swal.fire(
          'Atención!',
          'Algo ha ido mal, vuele a intentarlo más tarde o contacta con el administrador',
          'error'
        );
      }
      if (err.status == 0) {
        Swal.fire(
          'Atención!',
          'No se pudo establecer una conexión con el backend',
          'error'
        );
      }
      
      //const error = err.error || err.statusText;
      return throwError(err);
    }))


  }
}