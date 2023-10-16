import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Instruction } from '../model/instruction/Instruction';

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
    let dataEnv;

      dataEnv = {
        user_id: localStorage.getItem('authToken'),
        instruction: data
      }



    try{
      console.log("Enviando nova instrução")
    const url = `${this.URL_SERVER}/instruction/registerInstruction`;
    return this.http.post(url, dataEnv);
    }catch(error){
      console.log("Erro ao deletar instructioi - " + error)
      return new Observable<any>
    }

    
  }

  async testInstruction(data: any): Promise<Observable<any>> {
    console.log("Enviando nova instrução");
    const url = `${this.URL_SERVER}/instruction/processInstruction`;
    const response = await this.http.post(url, data).toPromise();
    return of(response); 
  }

  async checkInstruction(user_id: any, algorithm: any): Promise<Observable<any>> {
    console.log("Check algorithm");
    const data = {
      user_id: user_id,
      algorithm: algorithm
    }
    const url = `${this.URL_SERVER}/instruction/checkAlgorithm`;
    const response = await this.http.post(url, data).toPromise();
    return of(response); 
  }
}