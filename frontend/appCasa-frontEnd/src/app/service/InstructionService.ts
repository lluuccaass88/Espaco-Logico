import { For } from "../model/instruction/For";
import { If } from "../model/instruction/If";
import { Instruction } from "../model/instruction/Instruction";
import { NewVariable } from "../model/instruction/NewVariable";

export class InstructionService {
  















  public addInstruction(type: string, instruction: any): void {
    console.log("===================== INICIO ==========================")
    // - limpa localstorage
    // localStorage.removeItem('instructionList') 

    let instructionList: Array<Instruction> = [];
    const storedList: any | undefined = localStorage.getItem('instructionList');

    let variableToSave: any|undefined
    let isFirt

    if (storedList) { // ta dando erro aqui
        console.log(JSON.parse(storedList))
    instructionList = JSON.parse(storedList)
    console.log(instructionList)
      isFirt = false;
      variableToSave = this.buildInstruction(type, instruction, isFirt);
    } else {
      instructionList = [];
      isFirt = true;
      variableToSave = this.buildInstruction(type, instruction, true);
    }

    //Comparando o que tem no parse e no list
  

    if(!this.hasReachedLimit(isFirt, JSON.parse(storedList))){  // se for o primeiro, se não for do tipo "if", se o numero de instruções dentro do if for menor que a quantidade definida
    
    



        this.linkInstructions(variableToSave, instructionList);
        console.log("Depois de linkar tudo: ")
        console.log(instructionList)

    
    

    }else{
      instructionList.push(variableToSave)  
    }

          console.log('Mostra que será salvo: ')
      console.log(instructionList)
  


     localStorage.setItem('instructionList', JSON.stringify(instructionList));

    let storedListAtual: any | undefined = localStorage.getItem('instructionList');

    console.log('Mostra estado atual da lista de instructions')
    console.log(JSON.parse(storedListAtual))
  }


























  private buildInstruction(type?: string, instructionPreBuild?: any, isFirt?: boolean):Instruction|undefined{
  let resultInstruction:Instruction|undefined;

  let instructionList: Array<Instruction> = [];
  const storedList: any | undefined = localStorage.getItem('instructionList');
  instructionList = JSON.parse(storedList)

  if(type == 'variable'){
    console.log("Instancioando nova variável")
    resultInstruction = new Instruction(type, instructionPreBuild);
    
    this.setId(isFirt, resultInstruction, instructionList);

  }
  if(type == 'variablemanipulatorVariable'){
    console.log("Instancioando nova manipular variável")
    this.setId(isFirt, resultInstruction,instructionList);
    resultInstruction = new Instruction(type, undefined, instructionPreBuild);
  }

  if(type == 'paint'){
    console.log("Instancioando paint")

    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(type, undefined, undefined, instructionPreBuild);
  }


  if(type == 'if') {//Construir a lógica aqui dentro
    console.log("Instancioando if")

    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(type, undefined, undefined, undefined, instructionPreBuild);
}
  if(type == 'for'){
    console.log("Instancioando for")

    this.setId(isFirt, resultInstruction, instructionList);
    resultInstruction = new Instruction(type, undefined, undefined, undefined, undefined, instructionPreBuild);
}
    console.log("Retorno da função buildInstruction: ")
    console.log(resultInstruction)

  return resultInstruction;
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

  private linkInstructions(instructionBuild?: any, instructionList?: Array<Instruction>){
    let retrievedInstruction: any | undefined;
    let ifInstance: If;
    let forInstance: For;
    let instructionInstance: Instruction;

    

    if(instructionList)
      if(instructionList[instructionList.length-1].type == 'if'){
        retrievedInstruction = instructionList[instructionList.length-1]

        ifInstance = new If(retrievedInstruction.ifC.valX, retrievedInstruction.ifC.valY, retrievedInstruction.ifC.condition, 
          retrievedInstruction.ifC.quantityInstructions);

//buildInstruction(type?: string, instructionPreBuild?: any, isFirt?: boolean)

          console.log(retrievedInstruction.ifC.intructions)




          for (let currentInstruction of retrievedInstruction.ifC.intructions) {
            if (currentInstruction) {
              let command;
          
              if (currentInstruction.type === "variable") {
                // Se o tipo de instrução for "variable", crie uma instância de NewVariable
                command = new NewVariable(currentInstruction.newVariable.name, currentInstruction.newVariable.value);
          
                // Adicione a instância de NewVariable a ifInstance
                const instruction = this.buildInstruction(currentInstruction.type, command, false);

                if (instruction !== undefined) {
                  ifInstance.setInstructions(instruction);
                  console.log(currentInstruction);
                }
                
            }
          }
          
        }

        instructionInstance = new Instruction("if", undefined, undefined, undefined, ifInstance);

        //Adiciona instrução no SE ou ENQUANTO
        if(instructionInstance.ifC)
        instructionInstance.ifC.setInstructions(instructionBuild);

        instructionList[instructionList.length-1] = instructionInstance;
        
        console.log("LINKED")
        console.log(instructionList[instructionList.length-1])
      }else if(instructionList[instructionList.length-1].type == 'for'){
        








        

        retrievedInstruction = instructionList[instructionList.length-1]

        forInstance = new For(retrievedInstruction.ifC.valX, retrievedInstruction.ifC.valY, retrievedInstruction.ifC.condition, 
          retrievedInstruction.ifC.quantityInstructions);

//buildInstruction(type?: string, instructionPreBuild?: any, isFirt?: boolean)

          console.log(retrievedInstruction.forC.intructions)




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
                  console.log(currentInstruction);
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
      console.log("oi")
      return true
    }

    if(instructionList)
    retrievedInstruction = instructionList[instructionList.length-1]

      console.log(retrievedInstruction)

    if(retrievedInstruction.type == 'if'){
      console.log("Quantidade de instruções = " + retrievedInstruction.ifC.quantityInstructions)
      console.log("Quantidade de itens no array = " + retrievedInstruction.ifC.intructions.length)

      if(retrievedInstruction.ifC.quantityInstructions > retrievedInstruction.ifC.intructions.length){
        console.log("oi")
        return false
      }else{
        console.log("oi")
        return true
      }
    }else{
      console.log("oi")
      return true;
    }

  }

}


