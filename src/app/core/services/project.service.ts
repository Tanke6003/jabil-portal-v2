import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
import { Project } from "../types/general";

@Injectable()
export class ProjectService {

  constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) {
  }
  GetProjects(available: number = -1): Observable<any> {
    // const token = GetLocalStorage("ManufacturingPortalToken");
    // const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Project/GetProjects?available=${available}`
    // , { headers }
  );
  }
  getProjectsByBuildingIds(buildingIds: string): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}Project/GetProjectsByBuildingIds?buildingIds=${buildingIds}`);
  }
  addUpdateProject(project: Project): Observable<any> {
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}Project/AddUpdateProject`, project);
  }


}
