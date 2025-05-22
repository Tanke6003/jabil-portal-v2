import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadConfigService } from "./load-config.service";
@Injectable({
  providedIn:'root'
})
export class HomeService{

  constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
  {

  }
  GetNews(available:number = -1){
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Home/GetNews?available=${available}`);
  }
  GetKPIs(){
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Home/GetKPIs`);
  }
}
