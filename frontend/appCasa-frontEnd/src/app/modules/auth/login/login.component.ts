import { Component } from '@angular/core';
import { ApiService } from '../../../service/ApiAuthService';
import { InputValidator } from 'src/app/service/utils/InputValidator';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private apiService: ApiService, private inputValidator: InputValidator, private router: Router) {}

  email: string = '';
  password: string = '';
  token: String = '';
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  public onLogin() {
    if (this.verfForm()) {
      let data = {
        user_email: this.email,
        user_secret_key: this.password
      };

      this.apiService.signIn(data).subscribe(res => {
        this.token = res.token

        if(this.token != ''){
          localStorage.setItem('authToken', this.token.toString());
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/home']);
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
    }
    else if(this.email == '' || this.password == ''){
      this.errorMessage = "Nem um campo pode ser vazio";
      this.showErrorMessage = true;
      return false;
    }
    return true;
  }


}
