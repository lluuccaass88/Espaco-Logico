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
    let token = localStorage.getItem('authToken')
    let user: any = localStorage.getItem('user')

    if(user)
      user = JSON.parse(user)

    if(token){
      this.showLogout = true;
        if(user.user_role == 'professor'){
          this.showDownload = true;
        }
    }
  }


  public logout(){
    this.apiAuthService.signOut()
    this.router.navigate(['/']);
  }

  public download(){ 
    window.open('../../../../assets/roles/atividades.pdf', '_blank');
  
  }

  public backToStart(){
    if(localStorage.getItem('authToken')){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/']);
    }
  }
}
