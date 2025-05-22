import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Kpi{
  
  id:number;
  title:string;
  value:number;
  posfix:string;
  class:string;
  link?:string;
  tendency?:KpiTendency;
}
export interface KpiTendency{
  value:number;
  posfix:string;
  icon:string;
}
@Component({
  selector: 'app-kpi-component',
  templateUrl: './kpi-component.component.html',
  styleUrls: ['./kpi-component.component.scss']
})
export class KpiComponentComponent {
  @Input() metrics:Kpi[]=[]
  constructor(private _router:Router) { }
  redirectTo(kpi:any){
    //open in new tab
    if (kpi.link.startsWith("http://") || kpi.link.startsWith("https://") || kpi.link.startsWith("www.")) {
      if(kpi.link.startsWith("www.")){
        kpi.link="http://"+kpi.link;
      }
      window.open(kpi.link, '_blank');
  
  } else {
      this._router.navigate([kpi.link]);
  }

  }


}
