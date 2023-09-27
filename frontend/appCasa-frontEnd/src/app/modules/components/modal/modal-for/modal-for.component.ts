import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() variavelCompartilhada: number | undefined;
  @Output() variavelCompartilhadaChange: EventEmitter<number> = new EventEmitter<number>();

  showError: boolean = false;
  errorMesage: string | undefined;

  valX: number | string | undefined;
  valY: number | string | undefined;
  condition: string | undefined;
  quantityInstructions: number | undefined;

  constructor(private inputValidator:InputValidator, private instructionService: InstructionService){}

  public addNewComand(){
    let contValidationSuccess = 0;

    if(!this.valX || !this.valY || !this.condition){
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

    if(this.instructionService.checkPreviousInstruction("if")){
      this.showError = true
      this.errorMesage = "Esta instrução não pode ser adicionada, pois a intrução anterior é uma instrução do tipo SE."
      contValidationSuccess++
    }

    if(!this.inputValidator.isNumeric(this.valY)){
      if(!this.instructionService.variableExists(this.valY)){
        this.showError = true
        this.errorMesage = "A váriavel digitada no campo valY não foi previamente declarada."
        contValidationSuccess++
      }  
    }

    if(contValidationSuccess == 0){
      let newFor:For = new For(this.valX, this.valY, this.condition, this.quantityInstructions)
      this.instructionService.addInstruction('for', newFor);
      this.variavelCompartilhada = 10;
      this.variavelCompartilhadaChange.emit(this.variavelCompartilhada);
    }


  }
}
