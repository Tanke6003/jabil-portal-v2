import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadConfigService } from './load-config.service';
import { Observable } from "rxjs";
import { GetLocalStorage } from "../functions/localstorage";



@Injectable()
export class UserService {
  constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {

  }
  getUsers(): Observable<any[]> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Users`);
  }
  AddOrUpdateUser(user: any): Observable<any> {
    const token =GetLocalStorage(this._loadConfigService.getConfig().tokenName);
    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
    return this._http.post<any[]>(`${this._loadConfigService.getConfig().apiUrl}User/AddOrUpdateUser`, user, { headers });
  }
  GetUsersLike(search: string): Observable<any[]> {
    const apiUrl = this._loadConfigService.getConfig().apiUrl;
    return this._http.post<any[]>(`${apiUrl}User/GetUsersLike`, { query: search });
  }

}
