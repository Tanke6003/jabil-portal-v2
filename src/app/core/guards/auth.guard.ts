import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GuardsService } from '../services/guard.service';
import { GetLocalStorage, GetToken, SetToken } from '../functions/localstorage';
import { MessageService } from 'primeng/api';
import { LoadConfigService } from '../services/load-config.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private guardService:GuardsService,private messageService:MessageService, private _loadConfigService: LoadConfigService) {
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.fnConfirm(state.url)
  }

  fnConfirm(route:string):Promise<boolean>{
    return new Promise(async (resolve,reject)=>{
      
      const token = await GetToken(this._loadConfigService.getConfig().tokenName);
      console.log(token.exp)
    if(token.exp == undefined){
      this.router.navigate(['/login'])
      reject(false)
    }
    resolve(true);
    // this.guardService.AuthRoute(route).subscribe({next:(res:any)=>{
    //   SetToken(this._loadConfigService.getConfig().tokenName,res.Token)
      
    //   if(res && res.Result == true){
    //     resolve(true)
    //   }
    //   else{
    //     this.router.navigate(['/'])
    //     reject(false)
    //   }
    // },error:(err)=>{
    //   this.messageService.add({severity:'warn',summary:'Warning',detail:err.error,key:'tr'});
    //   console.error(err)
    //   reject(false)
    //   this.router.navigate(['/'])
    //   }});
    })
    
  }

  
}
