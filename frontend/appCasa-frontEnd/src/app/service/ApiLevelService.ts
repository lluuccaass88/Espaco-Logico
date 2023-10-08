import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiLevelService {

//   private URL_SERVER:String = 'http://10.0.0.131:3333'
  private URL_SERVER: string = 'http://10.0.0.131:3333';

  constructor(private http: HttpClient) {}
    fetchData(): Observable<any> {
        const url = 'http://10.0.0.131:3333'; // URL da API   authToken

        return this.http.get(url); // Faz a requisição GET e retorna um Observable
    }
  
      async getLevelById(id: string): Promise<any> {
        const url = `${this.URL_SERVER}/level/getLevel/${id}`;
        try {
          const response = await this.http.get(url).toPromise();
          return response;
        } catch (error) {
          // Trate erros aqui, por exemplo, lançando um erro personalizado
          throw new Error('Falha ao buscar nível.');
        }
      }

}