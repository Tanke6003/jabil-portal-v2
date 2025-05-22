import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [AuthService],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    fullName: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email:    new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(1)])
  });

  constructor(
    private _messageService: MessageService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {}

  register() {
    if (this.registerForm.invalid) {
      return this._messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Form is not valid',
        life: 2000
      });
    }

    const { fullName, email, password } = this.registerForm.value;
    this._authService.Register({ fullName, email, password }).subscribe({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration completed',
          life: 2000,
          key: 'tr'
        });
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this._messageService.add({
          severity: err.status < 500 ? 'warn' : 'error',
          summary:  err.status < 500 ? 'Warning' : 'Error',
          detail:   err.error ?? 'Server error',
          life:     2000
        });
      }
    });
  }

  goToLogin() {
    this._router.navigate(['/login']);
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    this.register();
  }
}
