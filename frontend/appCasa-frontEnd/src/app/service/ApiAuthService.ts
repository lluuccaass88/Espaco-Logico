import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private URL_SERVER:String = 'http://10.0.0.131:3333'

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    const url = 'http://10.0.0.131:3333'; // URL da API

    return this.http.get(url); // Faz a requisição GET e retorna um Observable
  }

  register(data: any): Observable<any> {
    console.log("Enviando registro de novo usuário")
    const url = `${this.URL_SERVER}/auth/register`;
    return this.http.post(url, data);
  }

  signIn(data: any): Observable<any> {
    console.log("Enviando pedido de login")
    const url = `${this.URL_SERVER}/auth/authenticate`;
    return this.http.post(url, data);
  }

  signOut(): void {
    localStorage.removeItem('authToken')
  }

  isLoggedIn(): Boolean{
    if(localStorage.getItem('authToken') != null){
      return true;
    }else{
      return false;
    }
  }

}