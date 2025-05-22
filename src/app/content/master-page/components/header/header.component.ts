import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import {
  DeleteToken,
  GetLocalStorage,
  GetToken,
  UpdateLocalStorage,
} from "src/app/core/functions/localstorage";
import { LoadConfigService } from "src/app/core/services/load-config.service";
import { TokenProperties } from "src/app/core/types/general";
import { Role } from "src/app/core/types/config/roleModels";
@Component({
  selector: "ot-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [],
})
export class HeaderComponent implements OnInit {
  @Input() titleApp: string = "";
  @Input() version: string = "0.0.1";
  @Input() MenuButton: any[] = []
  userID: string = "";
  lenguages: any[] = [
    { code: "es-MX", flag: "es-MX" },
    { code: "en-US", flag: "en-US" },
    
  ];
  selectedLenguageStorage = GetLocalStorage("ot-selected-lenguage");
  selectedLenguage: any = null;
  selectedSite: any = null;
  userInfo:TokenProperties = {} as TokenProperties;
  Roles:Role[] = [];
  currentRole:Role = {} as Role;
  constructor(
    private translate: TranslateService,
    private _router: Router,
    private _loadConfigService:LoadConfigService
  ) {
  
    if(this.selectedLenguageStorage){
      this.translate.use(this.selectedLenguageStorage);
    this.selectedLenguage = this.lenguages.find((x) => {
      if (x.code == this.selectedLenguageStorage) {
        return x;
      }
    });
  }else{
    let defaultLenguage =  this._loadConfigService.getConfig().defaultLenguage;
    this.translate.use(defaultLenguage);
    this.selectedLenguage = this.lenguages.find((x) => {
      if (x.code == defaultLenguage) {
        return x;
      }
    }
    );
  }
      this.titleApp = this._loadConfigService.getConfig().appName;
      this.version = this._loadConfigService.getConfig().version;


    this.translate.onLangChange.subscribe({
      next: () => {

        this.MenuButton = [
          {
            separator: true,
          },
          {
            label: this.translate.instant("Logout")??"Log Out",
            icon: "pi pi-fw pi-power-off",
            command: () => {
              DeleteToken("ManufacturingPortalToken");
              this._router.navigate(["/login"]);
            },
          },
        ];
      },
    });

  }
  async initializeUserInfo() {
    this.userInfo = await GetToken(this._loadConfigService.getConfig().tokenName);
    console.log(this.userInfo);
    this.userID = this.userInfo.unique_name;
  }
  SelectedLenguageChague(): void {
    this.translate.use(this.selectedLenguage.code);
    this.selectedLenguageStorage = this.selectedLenguage.code
    UpdateLocalStorage("ot-selected-lenguage",this.selectedLenguageStorage);
  }

  ngOnInit() {
      
    this.initializeUserInfo();
  
    this.MenuButton = [
      {
        separator: true,
      },
      {
        label: this.translate.instant("Logout")??"Log Out",
        icon: "pi pi-fw pi-power-off",
        command: () => {
          DeleteToken(this._loadConfigService.getConfig().tokenName);
          this._router.navigate(["/login"]);
        },
      },
    ];

    this.MenuButton = this.MenuButton.map((item) => {
      if (item.label)
        return { ...item, label: this.translate.instant(item.label) };
      return item;
    });
  }
  goToLogin(){
    DeleteToken("ManufacturingPortalToken");
    this._router.navigate(["/login"]);
  }
}
