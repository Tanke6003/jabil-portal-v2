import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IshikawaService {

    constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
    }
    GetIshikawa(available: number = -1): Observable<any> {
  
      return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Ishikawa/GetIshikawas?available=${available}`
    );
    }
  }
