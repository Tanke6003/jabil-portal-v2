import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { MasterPageComponent } from './content/master-page/master-page.component';
import { ErrorComponent } from './core/components/error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './content/pages/auth/login/login.component';
import { FindLPAComponent } from './content/pages/find-lpa/find-lpa.component';
import { RegisterComponent } from './content/pages/auth/register/register.component';

// Serializer para URLs en minúsculas
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'report', // Ruta inicial redirigida a "report"
    pathMatch: 'full',
  },
  {
    path: '',
    component: MasterPageComponent,
    loadChildren: () =>
      import('./content/master-page/master-page.module').then((m) => m.MasterPageModule),
    canActivate: [AuthGuard], // Habilitado si es necesario
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path:'find-lpa',
    component: FindLPAComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: '', // Redirige a la ruta principal si no se encuentra una ruta
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: DefaultUrlSerializer, useClass: LowerCaseUrlSerializer },
  ],
})
export class AppRoutingModule {}
