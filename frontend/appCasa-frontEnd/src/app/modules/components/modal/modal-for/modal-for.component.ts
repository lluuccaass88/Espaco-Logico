import { Component } from '@angular/core';
import { InputValidator } from 'src/app/service/utils/InputValidator';
import { InstructionService } from 'src/app/service/InstructionService';
import { Instruction } from 'src/app/model/instruction/Instruction';
import { For } from 'src/app/model/instruction/For';



@Component({
  selector: 'app-modal-for',
  templateUrl: './modal-for.component.html',
  styleUrls: ['./modal-for.component.css']
})
export class ModalForComponent {
  showError: boolean = false;
  errorMesage: string | undefined;

  valX: number | string | undefined;
  valY: number | string | undefined;
  condition: string | undefined;

  constructor(private inputValidator:InputValidator, private instructionService: InstructionService){}

  public addNewComand(){
    let contValidationSuccess = 0;

    if(!this.valX || !this.valY || !this.condition){
      this.showError = true;
      this.errorMesage = "Todos os campos devem ser preenchidos."
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
      let newFor:For = new For(this.valX, this.valY, this.condition)
      this.instructionService.addInstruction('for', newFor);
    }

  }
}
