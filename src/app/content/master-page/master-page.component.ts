import { Component, OnInit } from "@angular/core";
import { NavItem } from "src/app/core/types/nav.types";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "src/app/core/services/auth.service";
import { GetLocalStorage, GetToken, SetToken } from "src/app/core/functions/localstorage";
import { Router } from "@angular/router";
import {  TokenProperties } from "src/app/core/types/general";
import { LoadConfigService } from '../../core/services/load-config.service';
import { MessageService } from "primeng/api";
@Component({
  selector: "app-master-page",
  templateUrl: "./master-page.component.html",
  styleUrls: ["./master-page.component.scss"],
  providers:[AuthService]
})
export class MasterPageComponent implements OnInit {
  menuLoaded:boolean = false;//replace to false
  items: NavItem[] =[
   
]
  UserInfo: TokenProperties = { } as TokenProperties;
  enviroment:string = "Development";
  constructor(private translate: TranslateService, private _authService:AuthService,private _router:Router,private loadConfigService:LoadConfigService,private messageService:MessageService) {
  }
  async initializeUserInfo() {
    this.UserInfo = await GetToken(this.loadConfigService.getConfig().tokenName);
  }
  
  //getMenuByApi with PKUser and FKDepartment
  getMenu(){
    // this._authService.GetMenu().subscribe(
    //   {
    //     next:(res)=>{
    //       this.items = res
    //     },
    //     error:(err)=>{
    //       console.error(err)
    //       if(err.status === 401){
    //         this._router.navigate(['/login'])
    //       }
    //     },
    //     complete:()=>{
    //       this.menuLoaded = true;
    //     }
    //   }
    // )
    this.items = [{name:"Applications",icon:"pi pi-fw pi-home",href:"/applications"},
      {name:"register Application",icon:"fas fa-circle-plus",href:"/application"},
      {name:"My Tickets",icon:"fas fa-clipboard-list",href:"/my-tickets"},
    ]
    this.menuLoaded = true;
  }
  async loginAsGuest(){
    return new Promise<void>((resolve,reject)=>{
      this._authService.LoginAsGuest().toPromise().then(async (res)=>{
        SetToken(this.loadConfigService.getConfig().tokenName,res)
        this.UserInfo = await GetToken(this.loadConfigService.getConfig().tokenName)
        //this.getMenu()
        resolve();
      }
      ).catch((err)=>{
        console.error(err)
        reject();
      })
    })
 
  }
  async hasLogin():Promise<Boolean>{
    return new Promise(async (resolve,reject)=>{
      await this.initializeUserInfo();
      //console.log("userroleid",this.UserInfo.RoleId )
      if(this.UserInfo.role == "" || this.UserInfo.role == null || this.UserInfo.role == undefined  )
      {
          await this.loginAsGuest();
          resolve(true)
      }
  
      resolve(true)
    })

  }
  async ngOnInit() {
    this.getMenu()
    // await this.initializeUserInfo();
    // await this.hasLogin().then((value)=>{

    //   if(value)
    //     this.getMenu()
    //   else
    //     this.loginAsGuest()
    // })
    this.enviroment = this.loadConfigService.getConfig().environment

  }
}
