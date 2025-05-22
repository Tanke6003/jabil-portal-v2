import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LPALevelService {

   constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
    {
  
    }
    getLPALevels(available:number= -1){
        
        return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}LPALevel/GetLPALevels?available=${available}`);
    }
}
