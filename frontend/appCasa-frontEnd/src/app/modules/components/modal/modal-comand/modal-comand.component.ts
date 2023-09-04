import { Component } from '@angular/core';
import { InputValidator } from 'src/app/service/utils/InputValidator';
import { InstructionService } from 'src/app/service/InstructionService';

import { Instruction } from 'src/app/model/Instruction';

@Component({
  selector: 'app-modal-comand',
  templateUrl: './modal-comand.component.html',
  styleUrls: ['./modal-comand.component.css']
})
export class ModalComandComponent {
  showError: boolean = false;
  
  valX: number | undefined;
  valY: number | undefined;
  
  constructor(private inputValidator:InputValidator, private instructionService: InstructionService){}

  public addNewComand(){
    if(!this.inputValidator.isNumeric(this.valX) || !this.inputValidator.isNumeric(this.valY)){
      this.showError = true;
    }else{
      let instruction:Instruction = new Instruction(0, this.valX, this.valY)
      this.instructionService.addInstruction(instruction);
    }
  }



}
