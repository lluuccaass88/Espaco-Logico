import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/ApiAuthService';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private apiAuthService: ApiService, private router: Router) {}

  showDownload: boolean = false
  showLogout: boolean = false
  

  async ngAfterViewInit() {
    console.log("Começou")
    if(localStorage.getItem('authToken')){
      this.showDownload = true;
      this.showDownload = true;
    }
  }


  public logout(){
    this.apiAuthService.signOut()
    this.router.navigate(['/']);
  }

  public download(){

  }

  public backToStart(){
    if(localStorage.getItem('authToken')){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/']);
    }
  }
}
