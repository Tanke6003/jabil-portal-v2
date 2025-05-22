import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
import { Line } from "../types/general";

@Injectable({
  providedIn:'root'
})
export class LineService{

  constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
  {

  }
  GetLinesByProject(projectId:number,available:number= -1){
      
      return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Line/GetLinesByProjectID?projectId=${projectId}&available=${available}`);
  }
  addUpdateLine(line:Line){
      return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Line/AddUpdateLine`,line);
  }

}
