import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';

import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegistrationPageComponent } from './components/pages/registration-page/registration-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';

import { HeaderComponent } from './components/header/header.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { ButtonCreateTaskComponent } from './components/UI/button-create-task/button-create-task.component';
import { ButtonCreateCategoryComponent } from './components/UI/button-create-category/button-create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';

import { FakeBackendInterceptor } from './interceptors/fake-backend.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    HomePageComponent,
    CategoriesPageComponent,
    HeaderComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    TasksListComponent,
    CreateTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    CreateCategoryComponent,
    ButtonCreateTaskComponent,
    ButtonCreateCategoryComponent,
    EditCategoryComponent,
    CategoriesListComponent,
    DeleteCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
