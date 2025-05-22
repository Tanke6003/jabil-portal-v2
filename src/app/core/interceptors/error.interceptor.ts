// error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private messageService:MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.error("Errror inteceptor",error)
      
        if (error instanceof HttpErrorResponse && (error.status === 500 )) {
 
              this.messageService.add({key:'tr',severity:'error',summary:'Error',detail:error.error? error.error : error.message})
            
        }
        if(error instanceof HttpErrorResponse && error.status === 0){
          this.messageService.add({key:'tr',severity:'error',summary:'Error',detail:'no se pudo conectar con la api'})
        
        }
        if(error instanceof HttpErrorResponse && error.status === 404){
          this.messageService.add({key:'tr',severity:'error',summary:'Error',detail:error.message})
        }
        // if(error instanceof HttpErrorResponse && error.status === 401){
        //   this.messageService.add({key:'tr',severity:'error',summary:'Error',detail:error.message})
        // }
        return throwError(error);

      })

    );
  }
}