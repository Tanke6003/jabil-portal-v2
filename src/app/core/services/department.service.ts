import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
   constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
   {
 
   }
   getDepartments(available:number= -1){
       
       return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Department/GetDepartments?available=${available}`);
   }
   addUpdateDepartment(department:any){
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Department/AddUpdateDepartment`,department);
   }
}
