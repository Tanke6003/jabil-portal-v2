import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadConfigService {
  private configSubject = new BehaviorSubject<Object | null>(null);
  private cacheTimeout: number = 60000//30000//900000;
  private headers = new HttpHeaders().append('Cache-Control', 'no-cache');
  constructor(private _http: HttpClient) {
    this.scheduleCacheRefresh();
  }

  

  loadConfig(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const timestamp = new Date().getTime();

        this._http.get(`assets/config.json?timestamp=${timestamp}`,{headers:this.headers}).subscribe({
          next: (res: Object) => {
            this.configSubject.next(res);
            resolve();
          },
          error: (err) => {
            reject(err);
          },
     
        });
    });
  }

  

  getConfig(): any{
    return this.configSubject.getValue()??{};
  }
  private scheduleCacheRefresh(): void {
    setTimeout(() => {
      this.loadConfig().then(() => {
        
        console.info("refresh at: ", new Date());
        this.scheduleCacheRefresh();
      }).catch((err) => {
        console.error("Failed to refresh config at: ", new Date(),err);
        this.scheduleCacheRefresh();
      });
    }, this.cacheTimeout);
  }
}
