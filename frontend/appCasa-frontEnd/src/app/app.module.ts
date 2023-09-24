import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
import { PdfRenderComponent } from './modules/game/pdf-render/pdf-render.component';
import { FlowchartComponent } from './modules/components/flowchart/flowchart.component';
import { ApiInstructionService } from './service/ApiInstructionService';


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
    ModalForComponent,
    PdfRenderComponent,
    FlowchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [
    ApiService,
    ApiInstructionService,
    InstructionService,
    InputValidator,
    BuildComands
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

