import { NgModule } from '@angular/core';
import {NbMenuModule, NbCardModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {MyAttendanceComponent} from "./my-attendance/my-attendance.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {SimpleNotificationsModule} from "angular2-notifications";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    AutocompleteLibModule,
    SimpleNotificationsModule
  ],
  declarations: [
    PagesComponent,
    MyAttendanceComponent
  ],
})
export class PagesModule {
}
