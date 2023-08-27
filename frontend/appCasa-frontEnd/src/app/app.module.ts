import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomePageComponent } from './modules/auth/home-page/home-page.component'
import { LoginComponent } from './modules/auth/login/login.component';

import { ApiService } from './service/ApiAuthService';
import { InputValidator } from './service/utils/InputValidator';
import { MessageErrorComponent } from './modules/components/message-error/message-error.component';
import { GameScreenComponent } from './modules/game/game-screen/game-screen.component';
import { HomeStudentComponent } from './modules/game/home-student/home-student.component';
import { ComandComponentComponent } from './modules/components/comand-component/comand-component.component';
import { IfComponentComponent } from './modules/components/if-component/if-component.component';
import { ForComponentComponent } from './modules/components/for-component/for-component.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomePageComponent,
    MessageErrorComponent,
    LoginComponent,
    GameScreenComponent,
    HomeStudentComponent,
    ComandComponentComponent,
    IfComponentComponent,
    ForComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    InputValidator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

