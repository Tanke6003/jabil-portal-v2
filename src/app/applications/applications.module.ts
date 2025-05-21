import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationSearchComponent } from './application-search/application-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApplicationListComponent,
    ApplicationFormComponent,
    ApplicationSearchComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ApplicationsModule { }
