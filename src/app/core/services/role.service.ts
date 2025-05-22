import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
@Injectable()
export class RoleService {
  constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
  }

  GetRolesLowers(): Observable<any> {
    const token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Role/GetRolesLowers`, { headers });
  }
  GetRoles(available:number = -1){
    const token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Role/GetRoles?available=${available}`, { headers });
  
  }
}
