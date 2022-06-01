import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegistrationPageComponent } from './components/pages/registration-page/registration-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
