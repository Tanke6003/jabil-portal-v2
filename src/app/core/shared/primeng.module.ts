import { NgModule } from "@angular/core";
import { SplitButtonModule } from "primeng/splitbutton";
import { DropdownModule } from "primeng/dropdown";
import { ToastModule } from "primeng/toast";
import { TableModule, TableRadioButton } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import { StepsModule } from 'primeng/steps';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  exports: [
    SplitButtonModule,
    DropdownModule,
    ToastModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CascadeSelectModule,
    CalendarModule,
    MultiSelectModule,
    TabViewModule,
    ChipModule,
    StepsModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    FileUploadModule,
    AvatarModule,
    AvatarGroupModule,
    RadioButtonModule,
    PanelModule,
    TabMenuModule,
    ProgressBarModule,
    AutoCompleteModule
  ],
})
export class PrimengModule {}
