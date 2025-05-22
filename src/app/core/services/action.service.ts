import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
import { ActionTaskDto } from "../types/config/actions";
import { shareReplay } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class ActionService{

  constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
  {

  }
  AddOrUpdateAction(req:any){
    const token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
      return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Action/AddOrUpdateAction`,req,{headers});
    }
  GetActions(projectIDs:string = '-1'){
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Action/GetActions?projectIds=${projectIDs}`);
  }
  GetActionByActionID(actionID:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}Action/GetActionByActionID?actionID=${actionID}`);
  }
  AddOrUpdateActionTask(req: ActionTaskDto, file?: File) {
    const token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('reqActionTask', JSON.stringify(req));

    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Action/AddOrUpdateActionTask`, formData, { headers });
  }
  GetActionsStatus(available:number = -1){
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Action/GetActionStatus?available=${available}`);
  }
  GetActionsType(includeNone:number = 0,available:number = -1){
    //console.log(`${this._loadConfigService.getConfig().apiUrl}Action/GetActionTypes?includeNone=${includeNone}&available=${available}`);
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Action/GetActionTypes?includeNone=${includeNone}&available=${available}`);
  }
  GetActionsReport(projectIDs:string,actionTypeIDs:string,actionStatusIDs:string,beginDate:string,endDate:string,available:number = -1){
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Action/GetActionsReport?projectIDs=${projectIDs}&actionsTypesIds=${actionTypeIDs}&actionsStatusIds=${actionStatusIDs}&startDate=${beginDate}&endDate=${endDate}&available=${available}`);
  }
  updateAvailableAction(actionID:number,available:number){
    const token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}Action/UpdateAvailableAction?actionId=${actionID}&available=${available}`,{headers});
  }
}
