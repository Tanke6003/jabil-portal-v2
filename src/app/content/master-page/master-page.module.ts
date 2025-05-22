import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageComponent } from './master-page.component';
import { MasterPageRoutingModule } from './master-page-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MasterPageComponent,
    SidenavComponent,
    SublevelMenuComponent,
    HeaderComponent,

   
  ],
  imports: [
    CommonModule,
    MasterPageRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  providers:
  [
    TranslateService,
    SharedModule
  ]
})
export class MasterPageModule { }
