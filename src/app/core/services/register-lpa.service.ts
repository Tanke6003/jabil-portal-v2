import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterLpaService {

 
   constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
   }
   GetRegisters(): Observable<any> {
     // const token = GetLocalStorage("ManufacturingPortalToken");
     // const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
     return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}LPARegister/GetRegisters`
     // , { headers }
   );
   }
   GetRegister(code: string): Observable<any> {
     return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}LPARegister/GetRegister?code=${code}`);
   }
   AddRegister(register: any): Observable<any> {
     return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}LPARegister/AddRegister`, register);
   }
 
}
