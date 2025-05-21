import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }    from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // Redirige al login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta /auth/login
  { path: 'login',    component: LoginComponent },

  // Ruta /auth/register
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
