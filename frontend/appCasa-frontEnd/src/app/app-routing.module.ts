import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Pages
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component'
import { HomePageComponent } from './modules/auth/home-page/home-page.component'
import { GameScreenComponent } from './modules/game/game-screen/game-screen.component';
import { HomeStudentComponent } from './modules/game/home-student/home-student.component';

import { AuthGuard } from './service/utils/AuthGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomeStudentComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameScreenComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }