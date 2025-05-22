import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscrepanciesReportService {

  constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
  }
  getLastTwelveWeeks(ids: string, date: string): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}DiscrepanciesReport/GetLastTwelveWeeks?ids=${ids}&date=${date}`);
  }
  getParetoDiscrepancies(ids: string, date: string): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}DiscrepanciesReport/GetParetoDiscrepancies?ids=${ids}&date=${date}`);
  }
  getPainterDiscrepancies(ids: string, date: string): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}DiscrepanciesReport/GetPainter?ids=${ids}&date=${date}`);
  }
}
