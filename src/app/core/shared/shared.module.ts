import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
//Personalized
import { LoaderComponent } from '../components/loader/loader.component';
import { MixedChartComponent } from '../components/highChartsComponents/mixed-chart.component';
import { PieChartComponent } from '../components/highChartsComponents/pie-chart.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
//translate
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateCustomService } from '../services/translate.service'
import { TranslationLoader } from '../services/translation-loader'
//prime
import { PrimengModule } from './primeng.module';
import { PainterComponent } from '../components/painter/painter.component';
import { ActionTableComponent } from '../components/action-table/action-table.component';
import { LineService } from '../services/line.service';
import { SiteService } from '../services/sites.service';
import { ActionService } from '../services/action.service';
import { LoadConfigService } from '../services/load-config.service';
import { CarouselCardsComponent } from '../components/carousel-cards/carousel-cards.component';
import { KpiComponentComponent } from '../components/kpi-component/kpi-component.component';
import { FiveSService } from '../services/five-s.service';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LPALevelService } from '../services/lpa-level.service';
import { ShiftService } from '../services/shift.service';
import { DiscrepancyService } from '../services/discrepancy.service';
import { DiscrepancyRecordService } from '../services/discrepancy-record.service';
import { DiscrepanciesReportService } from '../services/discrepancies-report.service';
import { ReasonService } from '../services/reason.service';
import { IshikawaService } from '../services/ishikawa.service';
import { EMixedChartComponent } from '../components/echarts/e-mixed-chart/e-mixed-chart.component';

import { RegisterLpaService } from '../services/register-lpa.service';
import { AppliactionService } from '../services/application.service';
import { TikectService } from 'src/app/core/services/ticket.service';




export function translationCustomLoaderFactory(custom: TranslateCustomService) {
  return new TranslationLoader(custom)
}
export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    let key = `${params.key}`;
    return key;
  }
}
@NgModule({
  declarations: [
    LoaderComponent,
    MixedChartComponent,
    CarouselComponent,
    PainterComponent,
    ActionTableComponent,
    CarouselCardsComponent,
    KpiComponentComponent,
    PieChartComponent,
    EMixedChartComponent,
  ],
  imports: [
    PrimengModule,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (translationCustomLoaderFactory),
        deps: [TranslateCustomService, HttpClient]
      },
      isolate: false,
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler }
    }),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
  ], 
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    MixedChartComponent,
    PrimengModule,
    CarouselComponent,
    PainterComponent,
    ActionTableComponent,
    CarouselCardsComponent,
    KpiComponentComponent,
    PieChartComponent,
    CarouselModule,
    EMixedChartComponent,
  ],
  providers: [
    CookieService,
    LineService,
    SiteService,
    AppliactionService,
    ActionService,
    FiveSService,
    RoleService,
    UserService,
    ProjectService,
    LPALevelService,
    ShiftService,
    TikectService,
    DiscrepancyService,
    DiscrepancyRecordService,
    DiscrepanciesReportService,
    ReasonService,
    IshikawaService,
    RegisterLpaService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule
    }
  }
}

