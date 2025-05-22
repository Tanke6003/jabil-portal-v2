import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminUsersComponent } from '../pages/admin/admin-users/admin-users.component';
import { ApplicationsComponent } from '../pages/applications/applications.component';
import { ApplicationDetailComponent } from '../pages/application-detail/application-detail.component';
import { ApplicationFormComponent } from '../pages/application-form/application-form.component';
import { MyTicketsComponent } from '../pages/my-tickets/my-tickets.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'applications', // Redirige a la ruta "items" por defecto
    pathMatch: 'full',
  },
  {
    path:'admin',
    loadChildren: () => import('../pages/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path:'applications',
    component: ApplicationsComponent
  },
  { path: 'applications/:id', component: ApplicationDetailComponent },
  { path: 'application',component: ApplicationFormComponent },
  { path: 'application/:id',component: ApplicationFormComponent },
  { path:'my-tickets',component: MyTicketsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPageRoutingModule {}
