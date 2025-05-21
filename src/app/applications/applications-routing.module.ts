// src/app/applications/applications-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationSearchComponent } from './application-search/application-search.component';

const routes: Routes = [
  // Listado de aplicaciones: /applications
  { path: '',           component: ApplicationListComponent },

  // Crear nueva aplicación: /applications/new
  { path: 'new',        component: ApplicationFormComponent },

  // Búsqueda avanzada: /applications/search
  { path: 'search',     component: ApplicationSearchComponent },

  // Editar/Ver detalle de una aplicación: /applications/123
  { path: ':id',        component: ApplicationFormComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ApplicationsRoutingModule {}
