import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";

import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";

@Injectable()
export class AuthService {
      constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
      }

      Login(info: any): Observable<any> {
            console.log(info);
            return this._http.post<any[]>(`${this._loadConfigService.getConfig().apiUrl}auth/login`, info);
      }
      GetMenu(): Observable<any> {
            let token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
            const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Auth/GetMenu`, { headers });
      }
      GetUserInfoByNTUser(ntUser: string): Observable<any> {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Auth/GetUserInfoUserFromActiveDirectory?ntUser=${ntUser}`);
      }
      LoginAsGuest(): Observable<any> {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Auth/LoginAsGuest`);
      }
      Register(info: any): Observable<any> {
            console.log(info);
            return this._http.post<any[]>(`${this._loadConfigService.getConfig().apiUrl}auth/register`, info);
      }

}
