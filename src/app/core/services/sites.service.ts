import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
@Injectable()
export class SiteService{
  constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
  {

  }
  GetSites(available:number = -1):Observable<any[]>{
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Site/GetSites?available=${available}`);
  }
  AddOrUpdateSite(data:any){
    let token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
    return this._http.post<any[]>(`${this._loadConfigService.getConfig().apiUrl}Site/AddOrUpdateSite`,data,{headers});
  }

}
