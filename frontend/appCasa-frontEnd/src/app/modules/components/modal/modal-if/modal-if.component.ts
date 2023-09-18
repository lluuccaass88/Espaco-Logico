import { Component } from '@angular/core';
import { InputValidator } from 'src/app/service/utils/InputValidator';
import { InstructionService } from 'src/app/service/InstructionService';
import { Instruction } from 'src/app/model/instruction/Instruction';
import { If } from 'src/app/model/instruction/If';

@Component({
  selector: 'app-modal-if',
  templateUrl: './modal-if.component.html',
  styleUrls: ['./modal-if.component.css']
})
export class ModalIfComponent {
  showError: boolean = false;
  errorMesage: string | undefined;

  valX: number | string | undefined;
  valY: number | string | undefined;
  condition: string | undefined;
  quantityInstructions: number | undefined;

  constructor(private inputValidator:InputValidator, private instructionService: InstructionService){}

  public addNewComand(){
    let contValidationSuccess = 0;
    
    if(!this.valX || !this.valY || !this.condition || !this.quantityInstructions){
      this.showError = true;
      this.errorMesage = "Todos os campos devem ser preenchidos."
      contValidationSuccess++;
    }

    if(!this.inputValidator.isNumeric(this.quantityInstructions)){
      this.showError = true;
      this.errorMesage = "O campo quantidade de instruções deve ser preenchido com um número."
      contValidationSuccess++;
    }

    if(!this.inputValidator.isNumeric(this.valX)){
      if(!this.instructionService.variableExists(this.valX)){
        this.showError = true
        this.errorMesage = "A váriavel digitada no campo valX não foi previamente declarada."
        contValidationSuccess++
      }    
    }

    if(!this.inputValidator.isNumeric(this.valY)){
      if(!this.instructionService.variableExists(this.valY)){
        this.showError = true
        this.errorMesage = "A váriavel digitada no campo valY não foi previamente declarada."
        contValidationSuccess++
      }  
    }
    
    if(contValidationSuccess == 0){
      let newIf:If = new If(this.valX, this.valY, this.condition, this.quantityInstructions)
      this.instructionService.addInstruction('if', newIf);
    }

    
  }
}
