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
import { InstructionService } from './service/InstructionService';
import { InputValidator } from './service/utils/InputValidator';
import { MessageErrorComponent } from './modules/components/message-error/message-error.component';
import { GameScreenComponent } from './modules/game/game-screen/game-screen.component';
import { HomeStudentComponent } from './modules/game/home-student/home-student.component';
import { BuildComands } from './modules/components/BuildComands';
import { ModalComandComponent } from './modules/components/modal/modal-comand/modal-comand.component';
import { ModalIfComponent } from './modules/components/modal/modal-if/modal-if.component';
import { ModalForComponent } from './modules/components/modal/modal-for/modal-for.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomePageComponent,
    MessageErrorComponent,
    LoginComponent,
    GameScreenComponent,
    HomeStudentComponent,
    ModalComandComponent,
    ModalIfComponent,
    ModalForComponent
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
    InstructionService,
    InputValidator,
    BuildComands
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

