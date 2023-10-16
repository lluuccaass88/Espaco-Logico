import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule


//Pages
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component'
import { HomePageComponent } from './modules/auth/home-page/home-page.component'
import { GameScreenComponent } from './modules/game/game-screen/game-screen.component';
import { HomeStudentComponent } from './modules/game/home-student/home-student.component';
import { PdfRenderComponent } from './modules/game/pdf-render/pdf-render.component';
import { GameIntroductionComponent } from './modules/game/game-introduction/game-introduction.component';


import { AuthGuard } from './service/utils/AuthGuard';
import { GameTestComponent } from './modules/game/game-test/game-test.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomeStudentComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameScreenComponent, canActivate: [AuthGuard] },
  { path: 'pdfView', component: PdfRenderComponent, canActivate: [AuthGuard] },
  { path: 'introduction', component: GameIntroductionComponent, canActivate: [AuthGuard] },
  { path: 'test', component: GameTestComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    PdfViewerModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }