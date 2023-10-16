import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent {
  constructor(private router: Router) {}

  public handleNewGame(){
    this.router.navigate(['/introduction']);
  }

  public handleContinue(){
    this.router.navigate(['/game']);
  }

}
