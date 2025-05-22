import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/core/services/auth.service";
import { SetLocalStorage, SetToken } from "src/app/core/functions/localstorage";
import { LoadConfigService } from "src/app/core/services/load-config.service";
import { Login } from "src/app/core/types/general";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  title: string = "";
  version: string = "0.0.0";
  supportEmail: string = "";
  loginForm: FormGroup = new FormGroup({
    email:new FormControl( "", Validators.required),
    password:new  FormControl( "", Validators.required),
  });
  CanLoginAsGuest: boolean = true;

  constructor(
    private _messageService: MessageService,
    private _loginService: AuthService,
    private _router: Router,
    private _loadConfigService: LoadConfigService
  ) {
  }
  ngOnInit() {
    this.title = this._loadConfigService.getConfig().appName;
    this.version = this._loadConfigService.getConfig().version;
    this.supportEmail = this._loadConfigService.getConfig().supportEmail;
  }



  login() {
    if (!this.loginForm.valid)
      return this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'This form is not valid', life: 2000 });
    let userInfo: Login = this.loginForm.value;
    this._loginService.Login(userInfo).subscribe({
      next: (res:any) => {
        SetToken(this._loadConfigService.getConfig().tokenName, res.token);
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        if(err.status<500)
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: err.error, life: 2000 });
        else
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error??"Server Error", life: 2000 });
      },
      complete: () => {

      }
    })

  }
   goToRegister() {
    this._router.navigate(['/register']);
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.login();
  }
}
