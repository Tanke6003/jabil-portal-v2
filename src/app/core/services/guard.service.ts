import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from '../functions/localstorage';
@Injectable()
export class GuardsService {
    constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
    }
    // AuthRoute(route:string): Observable<any> {
    //     const token = GetLocalStorage("ManufacturingPortalToken");
    //     const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    //     return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Auth/HasAccess?route=${route}`,{headers});
    // }
    AuthRoute(route: string): Observable<any> {
        const token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
        const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
        return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Auth/HasAccess?route=${route}`, { headers });
    }
}