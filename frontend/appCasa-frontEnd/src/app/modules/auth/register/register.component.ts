import { Component } from '@angular/core';
import { ApiService } from '../../../service/ApiAuthService';
import { InputValidator } from 'src/app/service/utils/InputValidator';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  token: String = '';

  email: string = '';
  userName: string = '';
  role: string = '';
  password: string = '';
  passwordConsfirm: string = '';

  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private inputValidator: InputValidator, private router: Router) {}

  public registerNewUser() {
    if (this.verfForm()) {
      let data = {
        user_email: this.email,
        user_name: this.userName,
        user_role: this.role,
        user_secret_key: this.password
      };

      this.apiService.register(data).subscribe(res => {
        this.token = res.token

        if(this.token != ''){
          this.router.navigate(['/login']);
        }else{
          this.errorMessage = res.error.error;
          this.showErrorMessage = true;
        }
      });
    }
  }

  private verfForm(): boolean {
    if (!this.inputValidator.emailValidator(this.email)) {
      this.errorMessage = "Email inválido";
      this.showErrorMessage = true;
      return false;
    } else if (!this.inputValidator.passwordValidator(this.password)) {
      this.errorMessage = "Senha inválida";
      this.showErrorMessage = true;
      return false;
    }else if(this.password != this.passwordConsfirm){
      this.errorMessage = "As senhas não são iguais";
      this.showErrorMessage = true;
      return false;
    }
    else if(this.email == '' || this.password == '' || this.passwordConsfirm == '' || this.role == '' || this.userName == ''){
      this.errorMessage = "Nem um campo pode ser vazio";
      this.showErrorMessage = true;
      return false;
    }
    return true;
  }

}

