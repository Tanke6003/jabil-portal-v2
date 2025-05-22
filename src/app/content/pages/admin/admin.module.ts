import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminShiftsComponent } from './admin-shifts/admin-shifts.component';
import { AdminSitesComponent } from './admin-sites/admin-sites.component';
import { AdminDepartmentsComponent } from './admin-departments/admin-departments.component';
import { AdminDiscrepanciesComponent } from './admin-discrepancies/admin-discrepancies.component';
import { AddUpdateLPAComponent } from './add-update-lpa/add-update-lpa.component';



@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminShiftsComponent,
    AdminSitesComponent,
    AdminDepartmentsComponent,
    AdminDiscrepanciesComponent,
    AddUpdateLPAComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
