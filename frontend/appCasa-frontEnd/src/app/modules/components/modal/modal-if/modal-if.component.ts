import { Component } from '@angular/core';
import { InputValidator } from 'src/app/service/utils/InputValidator';
import { InstructionService } from 'src/app/service/InstructionService';

import { Instruction } from 'src/app/model/Instruction';


@Component({
  selector: 'app-modal-if',
  templateUrl: './modal-if.component.html',
  styleUrls: ['./modal-if.component.css']
})
export class ModalIfComponent {
  showError: boolean = false;
  
  valX: number | undefined;
  valY: number | undefined;
  condition: string | undefined;

  constructor(private inputValidator:InputValidator, private instructionService: InstructionService){}

  public addNewComand(){
    if(!this.inputValidator.isNumeric(this.valX) || !this.inputValidator.isNumeric(this.valY)){
      this.showError = true;
    }else{
      let instruction:Instruction = new Instruction(1, this.valX, this.valY, this.condition)
      this.instructionService.addInstruction(instruction);
    }
  }
}
