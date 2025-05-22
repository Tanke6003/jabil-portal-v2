import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoadConfigService } from "./load-config.service";
import { GetLocalStorage } from "../functions/localstorage";
@Injectable()
export class FiveSService {
  constructor(private _http: HttpClient, private _loadConfigService: LoadConfigService) { }
  
  GetProjects( available: number = -1): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetProjects?available=${available}`);
  }
  GetTypesProjects( available: number = -1): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GteTypesProjects?available=${available}`);
  }

  HasAnotherAudit(areaID:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/HasAnotherAudit?areaID=${areaID}`,{headers});
  }
  CreateAudit(areaID:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/CreateAudit?areaID=${areaID}`,{headers});
  }
  SaveTopic(auditId:number,topic:any){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.patch<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/SaveAuditTopic?auditID=${auditId}`, topic,{headers});
  }
  GetAuditByAuditID(auditID:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetAuditByAuditID?auditID=${auditID}`,{headers});
  }
  SaveAttendanceDepartment(req:any,auditID:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/SaveDepartmentsAttendances?auditID=${auditID}`, req,{headers});
  }
  SaveAudit(req:any){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/SaveAudit`, req,{headers});
  }
  GetLastTwelveWeeks(pksSubAreas:string,selectedDate:string){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetLastTwelveWeeks?pksSubAreas=${pksSubAreas}&date=${selectedDate}`);
  }
  CancelAudit(auditID:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`)
    return this._http.delete<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/CancelAudit?auditID=${auditID}`,{headers});
  }
  GetCheckLists(available: number = -1){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetCheckLists?available=${available}`);
  }
  GetTopicsDetailByCheckListId(checklistId:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetTopicsDetailsByChecklistId?checklistId=${checklistId}`);
  }
  GetQuestionsByTopicId(topicId: number, available: number = -1): Observable<any> {
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetQuestionsByTopicId?topicId=${topicId}&available=${available}`);
  }
  UploadQuestions(req:any){
    let token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`);
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/UploadQuestions`, req,{headers});
  }

  GetProjectsConfigs(available: number = -1): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetProjectsConfigs?available=${available}`);
  }
  GetProjectsByTypeProjectIdDivisionIdsBuildingIds(typeAreaID:number,divisionsIDs:string,buildingIDs:string): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetProjectsByTypeProjectIdDivisionIdsBuildingIds?typeAreaID=${typeAreaID}&divisionsIDs=${divisionsIDs}&buildingIDs=${buildingIDs}`);
  }
  GetProjectsByBuildingIDProjectTypeID(buildingID:number,projectTypeId:number): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetProjectsByBuildingIDProjectTypeID?buildingID=${buildingID}&projectTypeId=${projectTypeId}`);
  }
  GetZonesByAreaID(areaID:number): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetZonesByAreaID?areaID=${areaID}`);
  }
  GetDetractors(available: number = -1): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetDetractors?available=${available}`);
  }
  GetStations(available:number = -1): Observable<any> {
    return this._http.get<any[]>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetStations?available=${available}`);
  }
  GetAuditsForReport(projectsIds:string,beginDate:string,endDate:string){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetAuditsForReport?projectIds=${projectsIds}&beginDate=${beginDate}&endDate=${endDate}`);
  }
  GetTypesProjectsByProjectId(projectId:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetTypesProjectsByProjectId?projectId=${projectId}`);
  }
  ChangeIsOpenAudit(auditID:number,isOpen:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`);
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/ChangesIsOpenAudit?auditID=${auditID}&isOpen=${isOpen}`,{headers});
  }
  ChangeStatusAudit(auditID:number,status:number){
    const token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`);
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/ChangeStatusAudit?auditID=${auditID}&status=${status}`,{headers});
  }
  GetFiveSAuditCopyItems(projectId:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveSAudit/GetFiveSAuditCopyItems?projectId=${projectId}`);
  }
  GetWeeksWithOutAudit(projectId:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveSAudit/GetWeeksWithOutAudit?projectId=${projectId}`);
  }
  AddNewCopyRequestAudit(req:any){
    let token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`);
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}FiveSAudit/AddNewCopyRequestAudit`, req,{headers});
  }
  GetCopyRequestAudit(projectIds:string){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveSAudit/GetCopyAuditRequest?projectIds=${projectIds}`);
  }
  UpdateStatusCopyAuditRequest(requestId:number,status:number){
    let token = GetLocalStorage("ManufacturingPortalToken");
    const headers = new HttpHeaders().append('Authorization',`Bearer ${token}`);
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveSAudit/UpdateStatusCopyAuditRequest?requestId=${requestId}&statusId=${status}`,{headers});
  }
  GetPainter(projectsIds:string,date:string,painterTypeId:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}FiveS/GetPainter?projectIds=${projectsIds}&date=${date}&painterTypeId=${painterTypeId}`);
  }

}
