import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscrepancyService {

      constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
      }
      GetDiscrepancies(available: number = -1): Observable<any> {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Discrepancy/GetDiscrepancies?available=${available}`);
      }
      addUpdateDiscrepancy(discrepancy: any): Observable<any> {
            return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Discrepancy/AddUpdateDiscrepancy`, discrepancy);
      }
      GetDiscrepanciesByIshikawaId(ishikawaId:number, available:number=-1)
      {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Discrepancy/GetDiscrepanciesByIshikawaId?ishikawaId=${ishikawaId}&available=${available}`);
      }
      GetDiscrepanciesReport(projectIDs:string,beginDate:string,endDate:string){
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Discrepancy/GetDiscrepanciesReport?projectIds=${projectIDs}&startDate=${beginDate}&endDate=${endDate}`);
          }
}
