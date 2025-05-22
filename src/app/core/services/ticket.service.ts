import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadConfigService } from './load-config.service';
import { TicketReadDto } from '../types/general';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TikectService {


   constructor(private _http:HttpClient,private _loadConfigService:LoadConfigService)
   {
 
   }
  getTickets(appId?: number, status?: string): Observable<TicketReadDto[]> {
  let params = new HttpParams();

  if (appId != null) {
    params = params.set('appId', appId.toString());
  }
  if (status) {
    params = params.set('status', status);
  }

  return this._http.get<TicketReadDto[]>(
    `${this._loadConfigService.getConfig().apiUrl}tickets`,
    { params }
  );
}
  saveTicket(data:any){
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}tickets`,data);
   }
   getMyTikects(userId:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}tickets/my-tickets?userId=${userId}`);
   }
   getTicket(id:number) {

  return this._http.get<any>(
    `${this._loadConfigService.getConfig().apiUrl}tickets/${id}`
  );
}

   addComment(data:any,id:number){
    return this._http.post<any>(`${this._loadConfigService.getConfig().apiUrl}tickets/${id}/comments`,data);
   }
    getComments(id:number){
    return this._http.get<any>(`${this._loadConfigService.getConfig().apiUrl}tickets/${id}/comments`);
   }
    closeTicket(id:number){
      let data ={"status":"Cerrado"}
    return this._http.put<any>(`${this._loadConfigService.getConfig().apiUrl}tickets/${id}/status`,data,);
   }

}
