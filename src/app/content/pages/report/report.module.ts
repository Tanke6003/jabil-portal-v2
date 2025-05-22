import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FourQComponent } from './four-q/four-q.component';
import { DiscrepancieReportComponent } from './discrepancie-report/discrepancie-report.component';


@NgModule({
  declarations: [
  
    FourQComponent,
       DiscrepancieReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
