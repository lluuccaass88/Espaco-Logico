import { Injectable } from "@angular/core";
import { ApiLevelService } from "./ApiLevelService";
import { Level } from "../model/Level";

@Injectable({
  providedIn: 'root' // Indica que este serviço está disponível no nível raiz
})

export class LevelService {

  constructor(private apiLevelService: ApiLevelService){}

  async getLevel(user_id: any){
    const response = await (await this.apiLevelService.getLevelById(user_id))
    console.log(response);
    return response;

  }

}


