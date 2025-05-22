import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
//traducciones
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateCustomService } from './core/services/translate.service';
import { SharedModule,translationCustomLoaderFactory } from './core/shared/shared.module';
import { LoadConfigService } from './core/services/load-config.service';
import { ErrorComponent } from './core/components/error/error.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { GuardsService } from './core/services/guard.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DownComponent } from './core/components/down/down.component';
import { LoginComponent } from './content/pages/auth/login/login.component';
import { FindLPAComponent } from './content/pages/find-lpa/find-lpa.component';
import { ApplicationsComponent } from './content/pages/applications/applications.component';
import { RegisterComponent } from './content/pages/auth/register/register.component';
import { ApplicationDetailComponent } from './content/pages/application-detail/application-detail.component';
import { ApplicationFormComponent } from './content/pages/application-form/application-form.component';
import { MyTicketsComponent } from './content/pages/my-tickets/my-tickets.component';
import { TicketComponent } from './content/pages/ticket/ticket.component';




export function initializeApp(loadConfigService: LoadConfigService) {
  return () => loadConfigService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DownComponent,
    LoginComponent,
    FindLPAComponent,
    ApplicationsComponent,
    RegisterComponent,
    ApplicationDetailComponent,
    ApplicationFormComponent,
    MyTicketsComponent,
    TicketComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MessagesModule,
    TranslateModule.forRoot(
      {
      loader: {
        provide: TranslateLoader,
        useFactory: (translationCustomLoaderFactory),
        deps: [TranslateCustomService,HttpClient]
      },
      isolate: false
    }
    ),
    SharedModule.forRoot(),
  ],
  providers: [
    {
      provide:APP_INITIALIZER,
      useFactory:initializeApp,
      deps:[LoadConfigService,TranslateModule,SharedModule],
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    GuardsService,
    MessageService,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
