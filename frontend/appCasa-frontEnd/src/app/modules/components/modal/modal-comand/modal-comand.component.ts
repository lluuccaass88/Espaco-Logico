import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InputValidator } from 'src/app/service/utils/InputValidator';
import { InstructionService } from 'src/app/service/InstructionService';

import { NewVariable } from 'src/app/model/instruction/NewVariable';
import { VariableHandler } from 'src/app/model/instruction/VariableHandler';
import { Paint } from 'src/app/model/instruction/Paint';

import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-comand',
  templateUrl: './modal-comand.component.html',
  styleUrls: ['./modal-comand.component.css']
})
export class ModalComandComponent {
  @Input() variavelCompartilhada: number | undefined;
  @Output() variavelCompartilhadaChange: EventEmitter<number> = new EventEmitter<number>();

  showError: boolean = false;
  errorMesage:String | undefined;

  formChooseAction: Boolean = true;
  formNewVariable: Boolean = false;
  formManipulateVariable: Boolean = false; 
  formactionPaint: Boolean = false;

  action:Number | undefined;

  variableValue: number | undefined;
  showDefineValue:Boolean = false;

  variableName:string | undefined;
  manipulationVariable: string | undefined;
  valueManipulation:number | undefined;

  valX: number | undefined;
  valY: number | undefined;
  
  constructor(private inputValidator:InputValidator, private instructionService: InstructionService, private router: Router){}

  public chooseAction(){
    if(this.action == 0){
      this.formChooseAction = false;
      this.formNewVariable = true;
    } else if(this.action == 1){
      this.formChooseAction = false;
      this.formManipulateVariable = true;
    }
    else if(this.action == 2){
      this.formChooseAction = false;
      this.formactionPaint = true;
    }

    
  }

  public addNewVariable():void{
    let contValidationSuccess = 0;

    if(this.showDefineValue){  
      if(!this.inputValidator.isNumeric(this.variableValue)){
        this.showError = true
        this.errorMesage = "O campo valor deve receber apenas números."
        contValidationSuccess++;
      }
    }

    if(!this.variableName){
      this.showError = true
      this.errorMesage = "O campo Nome da Váriavel não deve ser nulo."
    }

    if(contValidationSuccess == 0){
      let newVariable:NewVariable = new NewVariable(this.variableName, this.variableValue)
      this.instructionService.addInstruction('variable', newVariable);
      this.variavelCompartilhada = 10;
      this.variavelCompartilhadaChange.emit(this.variavelCompartilhada);
    }


  }

  public addNewManipulateVariable():void{
    let contValidationSuccess = 0;

    //Verificação na service para ver se o nome da variavel existe
    if(!this.instructionService.variableExists(this.variableName)){
      this.showError = true
      this.errorMesage = "Não foi criada uma váriavel com este nome foi criada."
      contValidationSuccess++
    }


    if(!this.variableName && !this.manipulationVariable && !this.valueManipulation){
      this.showError = true
      this.errorMesage = "Nem um campo pode estar em branco."
      contValidationSuccess++
    }

    if(!this.inputValidator.isNumeric(this.valueManipulation)){
      this.showError = true
      this.errorMesage = "O campo valor deve receber apenas números."  
      contValidationSuccess++
    }

    if(contValidationSuccess == 0){
      let variableHandler:VariableHandler = new VariableHandler(this.variableName, this.manipulationVariable, this.valueManipulation)
      this.instructionService.addInstruction('manipulatorVariable', variableHandler);
      this.variavelCompartilhada = 10;
      this.variavelCompartilhadaChange.emit(this.variavelCompartilhada);
    }
  }

  public addNewPaint(){
    if(!this.inputValidator.isNumeric(this.valX) || !this.inputValidator.isNumeric(this.valY)){
      this.showError = true;
      this.errorMesage = "Apenas números são aceitos."
    }else{
      let paint:Paint = new Paint(this.valX, this.valY)
      this.instructionService.addInstruction('paint', paint);
      this.variavelCompartilhada = 10;
      this.variavelCompartilhadaChange.emit(this.variavelCompartilhada);
    }

  }

  public startWithValue(){
    this.showDefineValue = !this.showDefineValue;
    if(!this.showDefineValue)
      this.variableValue = undefined;
  }

}
