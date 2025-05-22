import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
  }
  GetReasonsByDiscrepancyId(discrepancyId: number,available:number = -1): Observable<any> {

    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Reason/GetReasonsByDiscrepancyId?discrepancyId=${discrepancyId}&available=${available}`
  );
  }
  addUpdateReason(reason: any): Observable<any> {
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Reason/AddUpdateReason`, reason);
  }

}
