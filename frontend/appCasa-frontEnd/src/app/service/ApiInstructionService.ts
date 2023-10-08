import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indicates that this service is available at the root level
})

export class ApiInstructionService {

  private URL_SERVER:String = 'http://10.0.0.131:3333'

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    const url = 'http://10.0.0.131:3333'; // URL da API   authToken

    return this.http.get(url); // Faz a requisição GET e retorna um Observable
  }

  newInstruction(data: any): Observable<any> {
    console.log("Enviando nova instrução")
    const url = `${this.URL_SERVER}/instruction/registerInstruction`;
    return this.http.post(url, data);
  }

  async testInstruction(data: any): Promise<Observable<any>> {
    console.log("Enviando nova instrução");
    const url = `${this.URL_SERVER}/instruction/processInstruction`;
    const response = await this.http.post(url, data).toPromise();
    return of(response); 
  }
}