import { Instruction } from "../model/Instruction";

export class InstructionService {
  instructionList: Array<Instruction> = [];
  
  public addInstruction(instruction: Instruction): void {
    const storedList = localStorage.getItem('instructionList');
    
    if (storedList) {
      this.instructionList = JSON.parse(storedList);
      this.instructionList.push(instruction);
        console.log(this.instructionList)

      localStorage.setItem('instructionList', JSON.stringify(this.instructionList));
    } else {
      this.instructionList.push(instruction);
      localStorage.setItem('instructionList', JSON.stringify(this.instructionList));
    }

    const storedListAtual = localStorage.getItem('instructionList');

    console.log(storedListAtual)
  }
}
