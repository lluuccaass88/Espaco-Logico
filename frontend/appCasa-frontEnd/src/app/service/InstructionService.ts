import { For } from "../model/instruction/For";
import { If } from "../model/instruction/If";
import { Instruction } from "../model/instruction/Instruction";
import { NewVariable } from "../model/instruction/NewVariable";
import { Paint } from "../model/instruction/Paint";
import { VariableHandler } from "../model/instruction/VariableHandler";

export class InstructionService {
  public addInstruction(type: string, instruction: any): void {
    console.log("===================== INICIO ==========================")
    // - limpa localstorage
    // localStorage.removeItem('instructionList') 

    let instructionList: Array<Instruction> = [];
    const storedList: any | undefined = localStorage.getItem('instructionList'); 
    let variableToSave: any|undefined
    let isFirt

    if (storedList) { 
      instructionList = JSON.parse(storedList)
      isFirt = false;
      variableToSave = this.buildInstruction(type, instruction, isFirt);
    } else {
      instructionList = [];
      isFirt = true;
      variableToSave = this.buildInstruction(type, instruction, true);
    }

    if(!this.hasReachedLimit(isFirt, JSON.parse(storedList))){  // se for o primeiro, se não for do tipo "if", se o numero de instruções dentro do if for menor que a quantidade definida
      this.setPosition(variableToSave, true)
      this.linkInstructions(variableToSave, instructionList);
    }else{
      this.setPosition(variableToSave, false)
      instructionList.push(variableToSave)  
    }

    console.log('Mostra que será salvo: ')
    console.log(instructionList)
  
    localStorage.setItem('instructionList', JSON.stringify(instructionList));

    //Into será apagado no futuro
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

  if(type == 'variable'){
    resultInstruction = new Instruction(type, instructionPreBuild);
    this.setId(isFirt, resultInstruction, instructionList);
  }
  if(type == 'variablemanipulatorVariable'){
    this.setId(isFirt, resultInstruction,instructionList);
    resultInstruction = new Instruction(type, undefined, instructionPreBuild);
  }

  if(type == 'paint'){
    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(type, undefined, undefined, instructionPreBuild);
  }

  if(type == 'if') {
    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(type, undefined, undefined, undefined, instructionPreBuild);
}
  if(type == 'for'){
    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(type, undefined, undefined, undefined, undefined, instructionPreBuild);
}
  return resultInstruction;
  }

  private linkInstructions(instructionBuild?: any, instructionList?: Array<Instruction>){
    let retrievedInstruction: any | undefined;
    let ifInstance: If;
    let forInstance: For;
    let instructionInstance: Instruction;

console.log("oi")

    if(instructionList)
      if(instructionList[instructionList.length-1].type == 'if'){
        retrievedInstruction = instructionList[instructionList.length-1]
        console.log(retrievedInstruction)

        ifInstance = new If(retrievedInstruction.ifC.valX, retrievedInstruction.ifC.valY, retrievedInstruction.ifC.condition, 
          retrievedInstruction.ifC.quantityInstructions, retrievedInstruction.ifC.intructions); //Mas e se o if já tiver instruções? Não esta passando elas no construtor

          console.log(ifInstance)

        // for (let currentInstruction of retrievedInstruction.ifC.intructions) {
        //   if (currentInstruction) {
        //     let command;
            
        //     if (currentInstruction.type === "variable") {
        //       // Se o tipo de instrução for "variable", crie uma instância de NewVariable
        //       command = new NewVariable(currentInstruction.newVariable.name, currentInstruction.newVariable.value);
        //       // Adicione a instância de NewVariable a ifInstance
        //       const instruction = this.buildInstruction(currentInstruction.type, command, false);

        //       if (instruction !== undefined) {
        //         console.log("OI")
        //         ifInstance.setInstructions(instruction);
        //       }               
        //     }else if(currentInstruction.type === "variablemanipulatorVariable"){
        //       // Se o tipo de instrução for "variable", crie uma instância de NewVariable
        //       command = new VariableHandler(currentInstruction.name, currentInstruction.manipulation, currentInstruction.value);
        //       // Adicione a instância de NewVariable a ifInstance
        //       const instruction = this.buildInstruction(currentInstruction.type, command, false);

        //       if (instruction !== undefined) {
        //         console.log("OI")
        //         ifInstance.setInstructions(instruction);
        //       }               
        //     }else if(currentInstruction.type === "paint"){
        //       // Se o tipo de instrução for "variable", crie uma instância de NewVariable
        //       command = new Paint(currentInstruction.valX, currentInstruction.valY);
        //       // Adicione a instância de NewVariable a ifInstance
        //       const instruction = this.buildInstruction(currentInstruction.type, command, false);

        //       if (instruction !== undefined) {
        //         console.log("OI")
        //         ifInstance.setInstructions(instruction);
        //       }               
        //     }
        //   } 
        // }
        
        console.log(retrievedInstruction)
        console.log(instructionBuild)


        instructionInstance = new Instruction("if", undefined, undefined, undefined, ifInstance, undefined, retrievedInstruction.positionX, retrievedInstruction.positionY);

        console.log(instructionInstance)

        //Adiciona instrução no SE ou ENQUANTO
        if(instructionInstance.ifC)
        instructionInstance.ifC.setInstructions(instructionBuild);

        console.log(instructionInstance)

        instructionList[instructionList.length-1] = instructionInstance;
        
        console.log("LINKED")
        console.log(instructionList[instructionList.length-1])

      }else if(instructionList[instructionList.length-1].type == 'for'){
        retrievedInstruction = instructionList[instructionList.length-1]
        forInstance = new For(retrievedInstruction.forC.valX, retrievedInstruction.forC.valY, retrievedInstruction.forC.condition, 
        retrievedInstruction.forC.quantityInstructions);

        for (let currentInstruction of retrievedInstruction.forC.intructions) {
          if (currentInstruction) {
            let command;
            if (currentInstruction.type === "variable") {
              // Se o tipo de instrução for "variable", crie uma instância de NewVariable
              command = new NewVariable(currentInstruction.newVariable.name, currentInstruction.newVariable.value);
              // Adicione a instância de NewVariable a ifInstance
              const instruction = this.buildInstruction(currentInstruction.type, command, false);
              if (instruction !== undefined) {
                forInstance.setInstructions(instruction);
              }
            }else if(currentInstruction.type === "variablemanipulatorVariable"){
              // Se o tipo de instrução for "variable", crie uma instância de NewVariable
              command = new VariableHandler(currentInstruction.name, currentInstruction.manipulation, currentInstruction.value);
              // Adicione a instância de NewVariable a ifInstance
              const instruction = this.buildInstruction(currentInstruction.type, command, false);

              if (instruction !== undefined) {
                forInstance.setInstructions(instruction);
              }               
            }else if(currentInstruction.type === "paint"){
              // Se o tipo de instrução for "variable", crie uma instância de NewVariable
              command = new Paint(currentInstruction.valX, currentInstruction.valY);
              // Adicione a instância de NewVariable a ifInstance
              const instruction = this.buildInstruction(currentInstruction.type, command, false);

              if (instruction !== undefined) {
                forInstance.setInstructions(instruction);
              }               
            }
          }
        }

        instructionInstance = new Instruction("for", undefined, undefined, undefined, undefined, forInstance);

        //Adiciona instrução no SE ou ENQUANTO
        if(instructionInstance.forC)
        instructionInstance.forC.setInstructions(instructionBuild);

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

      if(retrievedInstruction.ifC.quantityInstructions > retrievedInstruction.ifC.intructions.length){
        return false
      }else{
        return true
      }
    }else if(retrievedInstruction.type == 'for'){

      if(retrievedInstruction.forC.quantityInstructions > retrievedInstruction.forC.intructions.length){
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
          console.log(currentInstruction.ifC.intructions)
          if(currentInstruction.ifC.intructions.length == 0){
            console.log(currentInstruction.ifC.intructions)

            instruction.positionY = currentInstruction.positionY + 100
          }else{
            console.log(currentInstruction.ifC.intructions)

            instruction.positionY = currentInstruction.ifC.intructions[currentInstruction.ifC.intructions.length-1].positionY + 100
          }
          console.log(currentInstruction.ifC.intructions)

          console.log(instruction)
        }else if(currentInstruction.type == 'for'){
          if(currentInstruction.forC.intructions.length == 0){
            instruction.positionY = currentInstruction.positionY + 100
          }else{
            instruction.positionY = currentInstruction.forC.intructions[currentInstruction.forC.intructions.length-1].positionY + 100
          }
        }
      }
      if(instruction.type == 'variable' || instruction.type == 'variablemanipulatorVariable' || instruction.type == 'paint'){
        instruction.positionX = 120
      }else if(instruction.type == 'if' || instruction.type == 'for'){
        instruction.positionX = 400
      } 
      console.log(currentInstruction.ifC.intructions)

      console.log(instruction)
    }else{

      if(!instructionList){
        instruction.positionY = 100
      }else{
        currentInstruction = instructionList[instructionList.length-1];
        instruction.positionY = currentInstruction.positionY + 100
      }


      console.log(instruction)

      if(instruction.type == 'variable' || instruction.type == 'variablemanipulatorVariable' || instruction.type == 'paint'){
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


}


