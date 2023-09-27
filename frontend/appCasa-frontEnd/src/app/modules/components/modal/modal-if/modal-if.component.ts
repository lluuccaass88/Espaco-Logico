import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    if(this.instructionService.checkPreviousInstruction("for")){
      this.showError = true
      this.errorMesage = "Esta instrução não pode ser adicionada, pois a intrução anterior é uma instrução do tipo ENQUANTO."
      contValidationSuccess++
    }
    
    if(contValidationSuccess == 0){
      let newIf:If = new If(this.valX, this.valY, this.condition, this.quantityInstructions)
      this.instructionService.addInstruction('if', newIf);
      this.variavelCompartilhada = 10;
      this.variavelCompartilhadaChange.emit(this.variavelCompartilhada); 
    }


  }
}
