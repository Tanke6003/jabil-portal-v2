import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
    { path: 'auth',         loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'applications', loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule ) },
  { path: 'tickets',      loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule) },
  { path: 'comments',     loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule) },
  { path: 'reports',      loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: 'dashboard',    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', redirectTo: 'applications', pathMatch: 'full' },
  { path: '**', redirectTo: 'applications' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
