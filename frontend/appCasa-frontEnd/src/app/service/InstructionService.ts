import { Injectable } from "@angular/core";
import { For } from "../model/instruction/For";
import { If } from "../model/instruction/If";
import { Instruction } from "../model/instruction/Instruction";
import { NewVariable } from "../model/instruction/NewVariable";
import { Paint } from "../model/instruction/Paint";
import { VariableHandler } from "../model/instruction/VariableHandler";
import { ApiInstructionService } from "./ApiInstructionService";

@Injectable({
  providedIn: 'root' // Indica que este serviço está disponível no nível raiz
})

export class InstructionService {

  constructor(private apiInstructionService: ApiInstructionService){}

  public addInstruction(type: string, instruction: any): void {
    console.log("===================== INICIO ==========================")


    let instructionList: Array<Instruction> = [];
    const storedList: any | undefined = localStorage.getItem('instructionList'); 
    let variableToSave: any|undefined
    let isFirt

    if (storedList) { 
      console.log("upi")
      instructionList = JSON.parse(storedList)

      isFirt = false;
      variableToSave = this.buildInstruction(type, instruction, isFirt);
    } else {
      console.log("upi")
      isFirt = true;
      variableToSave = this.buildInstruction(type, instruction, true);
    }

    if(isFirt){
      console.log("oi")
      this.setPosition(variableToSave, false)
      instructionList.push(variableToSave)  
    } else if(!this.hasReachedLimit(isFirt, JSON.parse(storedList))){  // se for o primeiro, se não for do tipo "if", se o numero de instruções dentro do if for menor que a quantidade definida
      console.log("oi")
      this.setPosition(variableToSave, true)
      this.linkInstructions(variableToSave, instructionList);
    }else if(JSON.parse(storedList)[JSON.parse(storedList).length - 1].type == 'if' 
      || JSON.parse(storedList)[JSON.parse(storedList).length - 1].type == 'for'){
        console.log("oi")
        this.setPosition(variableToSave, true)
        instructionList.push(variableToSave)  
    }else{
      console.log("oi")
      this.setPosition(variableToSave, false)
      instructionList.push(variableToSave)  
    }

    console.log('Mostra que será salvo: ')
    console.log(instructionList)
  
    localStorage.setItem('instructionList', JSON.stringify(instructionList));

    this.apiInstructionService.newInstruction(instructionList).subscribe(res => {
      console.log(res)
    });


    //Isto será apagado no futuro
    let storedListAtual: any | undefined = localStorage.getItem('instructionList');
    console.log('Mostra estado atual da lista de instructions')
    console.log(JSON.parse(storedListAtual))
  }

  public checkPreviousInstruction(type: String): boolean{
    const storedList = localStorage.getItem('instructionList');
    let instructionsLocalStorage: Array<Instruction> = [];

    if(storedList){
      instructionsLocalStorage = JSON.parse(storedList)

      if(instructionsLocalStorage[instructionsLocalStorage.length-1].type == type){
        return true;
      }else{
        return false;
      }
  }
    return false;
  }

  public variableExists(variable:string | number| undefined):Boolean{
    const storedList = localStorage.getItem('instructionList');
    let variableFind:boolean = false;
    let instructionsLocalStorage: Array<Instruction> = [];

    if(storedList){
      instructionsLocalStorage = JSON.parse(storedList)

      instructionsLocalStorage.filter(instruction => instruction.type === "variable")
      .map(instruction => {
        if(instruction.newVariable?.name == variable){
          variableFind = true
        }
      });
  }
    return variableFind;
  }

  public getInstructions(): any{
    let instructionList: Array<Instruction> = [];
    const storedList: any | undefined = localStorage.getItem('instructionList'); 
    
    if(storedList){
      instructionList = JSON.parse(storedList)
      return instructionList;
    }else{
      return null;
    }
  }

  private buildInstruction(type?: string, instructionPreBuild?: any, isFirt?: boolean):Instruction|undefined{
  let resultInstruction:Instruction|undefined;
  let instructionList: Array<Instruction> = [];
  const storedList: any | undefined = localStorage.getItem('instructionList');
  instructionList = JSON.parse(storedList)
  const userId = localStorage.getItem('authToken');

    console.log("OIOI")

  if(type == 'variable'){
    resultInstruction = new Instruction(
      type, 
      instructionPreBuild,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      userId);
    this.setId(isFirt, resultInstruction, instructionList);
  }
  if(type == 'manipulatorVariable'){
    this.setId(isFirt, resultInstruction,instructionList);
    resultInstruction = new Instruction(
      type, 
      undefined, 
      instructionPreBuild,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      userId);
  }

  if(type == 'paint'){
    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(
      type, 
      undefined, 
      undefined, 
      instructionPreBuild,
      undefined,
      undefined,
      undefined,
      undefined,
      userId
      );
  }

  if(type == 'if') {
    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(
      type, 
      undefined, 
      undefined, 
      undefined, 
      instructionPreBuild,
      undefined,
      undefined,
      undefined,
      userId);
}
  if(type == 'for'){
    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(
      type, 
      undefined, 
      undefined, 
      undefined, 
      undefined, 
      instructionPreBuild, 
      undefined,
      undefined,
      userId);
}

  console.log(resultInstruction)
  return resultInstruction;
  }

  private linkInstructions(instructionBuild?: any, instructionList?: Array<Instruction>){
    let retrievedInstruction: any | undefined;
    let ifInstance: If;
    let forInstance: For;
    let instructionInstance: Instruction;
    const userId = localStorage.getItem('authToken');

    if(instructionList)
      if(instructionList[instructionList.length-1].type == 'if'){
        retrievedInstruction = instructionList[instructionList.length-1]

        ifInstance = new If(retrievedInstruction.ifC.valX, retrievedInstruction.ifC.valY, retrievedInstruction.ifC.condition, 
          retrievedInstruction.ifC.quantityInstructions, retrievedInstruction.ifC.instructions); //Mas e se o if já tiver instruções? Não esta passando elas no construtor

          console.log(retrievedInstruction)

        instructionInstance = new Instruction("if", undefined, undefined, undefined, ifInstance, undefined, 
          retrievedInstruction.positionX, retrievedInstruction.positionY, retrievedInstruction.userId);

        //Adiciona instrução no SE ou ENQUANTO
        if(instructionInstance.ifC)
        instructionInstance.ifC.setInstructions(instructionBuild);

        instructionList[instructionList.length-1] = instructionInstance;
        
        console.log("LINKED")
        console.log(instructionList[instructionList.length-1])

      }else if(instructionList[instructionList.length-1].type == 'for'){
        retrievedInstruction = instructionList[instructionList.length-1]

        forInstance = new For(retrievedInstruction.forC.valX, retrievedInstruction.forC.valY, retrievedInstruction.forC.condition, 
          retrievedInstruction.forC.quantityInstructions, retrievedInstruction.forC.instructions); //Mas e se o if já tiver instruções? Não esta passando elas no construtor

          console.log(instructionList)

        instructionInstance = new Instruction("for", undefined, undefined, undefined, undefined, forInstance, 
          retrievedInstruction.positionX, retrievedInstruction.positionY, retrievedInstruction.userId);

          console.log(instructionInstance)

        //Adiciona instrução no SE ou ENQUANTO
        if(instructionInstance.forC)
        instructionInstance.forC.setInstructions(instructionBuild);

        console.log(instructionInstance)

        instructionList[instructionList.length-1] = instructionInstance;
        
        console.log("LINKED")
        console.log(instructionList[instructionList.length-1])
      }
  }

  private setId(isFirt?: boolean, resultInstruction?: any, instructionList?: Array<Instruction>){
    if(isFirt == false){
      resultInstruction?.setIdInstruction(instructionList?.length)   
      resultInstruction?.setPrevious(instructionList?.length)
    }else{
      resultInstruction?.setIdInstruction(0);
      resultInstruction?.setPrevious(undefined);
    }
  }

  private hasReachedLimit(isFirt?: boolean, instructionList?: Array<Instruction>): boolean{
    let retrievedInstruction: any | undefined;

    if(isFirt){ 
      return true
    }

    if(instructionList)
    retrievedInstruction = instructionList[instructionList.length-1]

    if(retrievedInstruction.type == 'if'){

      if(retrievedInstruction.ifC.quantityInstructions > retrievedInstruction.ifC.instructions.length){
        return false
      }else{
        return true
      }
    }else if(retrievedInstruction.type == 'for'){

      if(retrievedInstruction.forC.quantityInstructions > retrievedInstruction.forC.instructions.length){
        return false
      }else{
        return true
      }
    }else{
      return true;
    }

  }

  private setPosition(instruction?: any, isIfOrFor?: boolean){
    const storedList: any | undefined = localStorage.getItem('instructionList');
    let instructionList = JSON.parse(storedList)
    let currentInstruction;

    if(isIfOrFor){
      if(instructionList){
        currentInstruction = instructionList[instructionList.length-1];

        if(currentInstruction.type == 'if'){

          if(currentInstruction.ifC.instructions.length == 0){
            instruction.positionY = currentInstruction.positionY + 100
          }else{
            instruction.positionY = currentInstruction.ifC.instructions[currentInstruction.ifC.instructions.length-1].positionY + 100  
          }
        }else if(currentInstruction.type == 'for'){
          if(currentInstruction.forC.instructions.length == 0){
            instruction.positionY = currentInstruction.positionY + 100
          }else{
            instruction.positionY = currentInstruction.forC.instructions[currentInstruction.forC.instructions.length-1].positionY + 100
          }
        }
      }

      if(!this.hasReachedLimit(false, instructionList)){
        instruction.positionX = 120
      }else{
        instruction.positionX = 310
      } 

    }else{

      if(!instructionList){
        instruction.positionY = 100
      }else{
        currentInstruction = instructionList[instructionList.length-1];
        instruction.positionY = currentInstruction.positionY + 100
      }

      if(instruction.type == 'variable' || instruction.type == 'manipulatorVariable' || instruction.type == 'paint'){
        instruction.positionX = 310
      }else if(instruction.type == 'if' || instruction.type == 'for'){
        instruction.positionX = 400
        instruction.positionY = instruction.positionY + 60
      }
    }

    console.log("Com posição")
    console.log(instruction.positionX)
    console.log(instruction.positionY)

  }

  public async testAlgorithm(): Promise<any> {
    const storedList: any = localStorage.getItem('instructionList');
    const response = await (await this.apiInstructionService.testInstruction(JSON.parse(storedList))).toPromise();
    console.log(response);
    return response;
  }

  public async checkAlgorithm(algorithm: any): Promise<any> {
    const response = await (await this.apiInstructionService.checkInstruction(localStorage.getItem('authToken'), algorithm)).toPromise();
    console.log(response);
    return response;
  }

}


