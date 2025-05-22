import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { GetLocalStorage } from '../functions/localstorage';

@Injectable({
  providedIn: 'root'
})
export class DiscrepancyRecordService {
   constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
   {
 
   }
   AddOrUpdateDiscrepancyRecord(data:any){
         let token = GetLocalStorage(this._loadConfigService.getConfig().tokenName);
                  const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
       return this._http.post<any[]>(`${this._loadConfigService.getConfig().apiUrl}DiscrepancyRecord/AddOrUpdateDiscrepancyRecord`,data,{headers});
   }
}
