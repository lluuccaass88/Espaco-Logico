import { Component } from '@angular/core';
import { InputValidator } from 'src/app/service/utils/InputValidator';
import { InstructionService } from 'src/app/service/InstructionService';

import { Instruction } from 'src/app/model/Instruction';

@Component({
  selector: 'app-modal-for',
  templateUrl: './modal-for.component.html',
  styleUrls: ['./modal-for.component.css']
})
export class ModalForComponent {

  showError: boolean = false;
  
  valX: number | undefined;
  valY: number | undefined;
  condition: string | undefined;

  constructor(private inputValidator:InputValidator, private instructionService: InstructionService){}

  public addNewComand(){
    if(!this.inputValidator.isNumeric(this.valX) || !this.inputValidator.isNumeric(this.valY)){
      this.showError = true;
    }else{
      let instruction:Instruction = new Instruction(2, this.valX, this.valY, this.condition)
      this.instructionService.addInstruction(instruction);
    }
  }
}
