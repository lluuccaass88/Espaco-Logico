import { Instruction } from "../model/instruction/Instruction";

export class InstructionService {
  instructionList: Array<Instruction> = [];
  
  public addInstruction(type: string, instruction: any): void {
    //- limpa localstorage
    //localStorage.removeItem('instructionList') 

    const storedList = localStorage.getItem('instructionList');
    let variableToSave: any|undefined

    if (storedList) {
      this.instructionList = JSON.parse(storedList);
      variableToSave = this.buildInstruction(type, instruction, false);

    } else {
      variableToSave = this.buildInstruction(type, instruction, true);
    }
    
    this.instructionList.push(variableToSave);
    localStorage.setItem('instructionList', JSON.stringify(this.instructionList));

    const storedListAtual = localStorage.getItem('instructionList');

    console.log('Mostra estado atual da lista de structs')
    console.log(storedListAtual)
  }

private buildInstruction(type?: string, instructionPreBuild?: any, isFirt?: boolean):Instruction|undefined{
  let resultInstruction:Instruction|undefined;

  if(type == 'variable')
    resultInstruction = new Instruction(type, instructionPreBuild,undefined, undefined);


  if(type == 'variablemanipulatorVariable')
    resultInstruction = new Instruction(type, undefined, instructionPreBuild, undefined);


  if(type == 'paint')
    resultInstruction = new Instruction(type, undefined, undefined, instructionPreBuild);

  if(type == 'if') //Construir a lógica aqui dentro
    resultInstruction = new Instruction(type, undefined, undefined, undefined, instructionPreBuild);

  if(type == 'for')
    resultInstruction = new Instruction(type, undefined, undefined, undefined, undefined, instructionPreBuild);


  if(isFirt == false){
    resultInstruction?.setIdInstruction(this.instructionList.length)   
    resultInstruction?.setPrevious(this.instructionList.length-1)
  }else{
    resultInstruction?.setIdInstruction(0);
    resultInstruction?.setPrevious(undefined);
  }

    console.log("Instruction que será salva: ")
    console.log(resultInstruction)

  return resultInstruction;
}


  public variableExists(variable:string | number| undefined):Boolean{
    const storedList = localStorage.getItem('instructionList');
    let variableFind:boolean = false;

    if(storedList){
      this.instructionList = JSON.parse(storedList)

      this.instructionList.filter(instruction => instruction.type === "variable")
      .map(instruction => {
        if(instruction.newVariable?.name == variable){
          variableFind = true
        }
      });
  }
    return variableFind;
  }

}
