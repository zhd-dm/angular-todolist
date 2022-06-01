import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegistrationPageComponent } from './components/pages/registration-page/registration-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/registration', component: RegistrationPageComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
