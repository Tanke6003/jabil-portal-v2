import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { Shift } from '../types/general';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

   constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
   {
 
   }
   getShifts(available:number= -1){
       
       return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Shift/GetShifts?available=${available}`);
   }
   addUpdateShift(data:Shift){
       return this._http.post<any[]>(`${this._loadConfigService.getConfig().apiUrl}Shift/AddUpdateShift`,data);
   }
}
