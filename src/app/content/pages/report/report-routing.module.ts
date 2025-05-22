import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourQComponent } from './four-q/four-q.component';
import { DiscrepancieReportComponent } from './discrepancie-report/discrepancie-report.component';

const routes: Routes = [
  {
    path: 'reports',
    redirectTo: '4q', // Redirige a la ruta "items" por defecto
    pathMatch: 'full',
  },
  {
    component: FourQComponent,
    path: '4q',
  },
  {
    path:'discrepancies',
    component:DiscrepancieReportComponent
  },
  {
    path: '**',
    redirectTo: '4q', // Redirige a "items" para cualquier ruta no encontrada
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
