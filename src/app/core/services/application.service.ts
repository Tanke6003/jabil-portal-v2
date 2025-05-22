import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
import { ApplicationCreateDto } from "../types/general";

@Injectable()
export class AppliactionService {

      constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
      }
      GetApplications(): Observable<any> {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}applications`);
      }
       GetApplication(id:number): Observable<any> {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}applications/${id}`);
      }
      GetBuildingsBySiteIds(siteIds: string): Observable<any> {
            return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Building/GetBuildingsBySiteIds?siteIDs=${siteIds}`);
      }
      CreateApplication(data: any): Observable<any> {
 
            return this._http.post(`${this._loadConfigService.getConfig().apiUrl}applications`, data);
      }
     UpdateApplication(dto: ApplicationCreateDto, id: number): Observable<void> {
    return this._http.put<void>(
      `${this._loadConfigService.getConfig().apiUrl}applications/${id}`,
      dto,
      // Opcionalmente, si necesitas headers explícitos:
      // { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );}
}
