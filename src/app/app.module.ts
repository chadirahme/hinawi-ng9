/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule, NbButtonModule, NbInputModule, NbAlertModule, NbCheckboxModule,
} from '@nebular/theme';
import {AuthGuard} from "./auth-guard.service";
import {WsTopic} from "./@core/services/ws.topic";
import {ApiAuth} from "./@core/services/api.auth";
import {LoginComponent} from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, APP_BASE_HREF} from "@angular/common";
import {NbAuthModule} from "@nebular/auth";
import {BasicAuthHtppInterceptorService} from "./basic-auth-htpp-interceptor-service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {SimpleNotificationsModule} from "angular2-notifications";

@NgModule({
  declarations: [AppComponent,LoginComponent],
  imports: [
     CommonModule,

    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

     NbAuthModule,

     FormsModule,
     ReactiveFormsModule,
    AutocompleteLibModule,
     ThemeModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    SimpleNotificationsModule.forRoot() //add here and in pages.module
  ],
  bootstrap: [AppComponent],
  providers: [ApiAuth,WsTopic,AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
    {provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true},
  ],
})
export class AppModule {
}
