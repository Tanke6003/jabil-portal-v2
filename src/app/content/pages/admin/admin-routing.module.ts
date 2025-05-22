import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminShiftsComponent } from './admin-shifts/admin-shifts.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminSitesComponent } from './admin-sites/admin-sites.component';
import { AdminDepartmentsComponent } from './admin-departments/admin-departments.component';
import { AdminDiscrepanciesComponent } from './admin-discrepancies/admin-discrepancies.component';
import { AddUpdateLPAComponent } from './add-update-lpa/add-update-lpa.component';


const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'users', // Redirige a la ruta "items" por defecto
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: AdminUsersComponent, // Asigna el componente "AdminUsersComponent" a la ruta "users"
    canActivate: [AuthGuard], // Agrega el guard "AuthGuard" a la ruta "users"
  },
  
  {
    path: 'shifts',
    component: AdminShiftsComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path: 'sites',
    component: AdminSitesComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'departments',
    component: AdminDepartmentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'discrepancies',
    component: AdminDiscrepanciesComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'addupdatelpa',
    component: AddUpdateLPAComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'users', // Redirige a "items" para cualquier ruta no encontrada
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
