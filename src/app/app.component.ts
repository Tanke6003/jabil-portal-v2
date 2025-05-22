import { Component, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCustomService } from 'src/app/core/services/translate.service';
import { GetLocalStorage } from './core/functions/localstorage';
import { Router } from '@angular/router';
import { LoadConfigService } from './core/services/load-config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TranslateCustomService]
})
export class AppComponent {
  title = 'ManufacturingPortal';
  translationLoaded = false;
  statusApp:string = 'Up';
  public effectTranslate = effect(()=>{
    this.translateService.translationLoaded();
    this.translationLoaded  = true
  })
  constructor(translate:TranslateService,private translateService:TranslateCustomService,private _router:Router,
    private _loadConfig:LoadConfigService
    )
{
  this.statusApp=this._loadConfig.getConfig().statusApp
  
  translate.addLangs(['es-MX','en-US']);
  translate.setDefaultLang('es-MX');
  let lenguageSelected:string =this.getLenguageSelected();
  translate.use(lenguageSelected)

}
getLenguageSelected():string{
  let selectedLenguage =  GetLocalStorage("ot-selected-lenguage");
  if(selectedLenguage != null){
    return selectedLenguage
  }
  return '';
}


}
