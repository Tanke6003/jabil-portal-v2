// src/app/auth/login/login.component.ts
import { Component }            from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }               from '@angular/router';
import { AuthService }          from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) { return; }

    this.auth.login(this.loginForm.value).subscribe({
      next: res => {
        // guarda el token
        localStorage.setItem('token', res.token);
        // navega a la lista de apps
        this.router.navigate(['/applications']);
      },
      error: err => {
        this.errorMsg = err.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}
