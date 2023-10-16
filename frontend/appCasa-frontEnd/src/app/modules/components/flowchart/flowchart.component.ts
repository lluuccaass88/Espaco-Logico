import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as Konva from 'konva';
import { BuildComands } from '../../components/BuildComands';
import { Instruction } from 'src/app/model/instruction/Instruction';
import { InstructionService } from 'src/app/service/InstructionService';
import { SlicePipe } from '@angular/common';

 
@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent {

  constructor(private buildComands: BuildComands, private instructionService: InstructionService) {}
  instructionList: any 

  ngAfterViewInit() {  
    const self = this;
    self.loadInstructionsFromDataBase()
    self.loadInstructions(false)
  }

   loadInstructionsFromDataBase(){
      //Na service esta pegando do local storage, tem que apontar pro servidor
      this.instructionList = this.instructionService.getInstructions();
  }

  public loadInstructions(loadLocalStorage:boolean){
    let  instructionListFromLocalStorage
   
    if(loadLocalStorage == true){
      instructionListFromLocalStorage = localStorage.getItem('instructionList');

      if(instructionListFromLocalStorage){
        this.instructionList = JSON.parse(instructionListFromLocalStorage)
      }else{
        this.instructionList = undefined
      }
    }

    if(this.instructionList != undefined){ 
      const heightCanva = this.instructionList[this.instructionList.length - 1].positionY + 500

      const stage = new Konva.default.Stage({
        container: 'containerCanvaFlowchart',
        width: 500,
        height: heightCanva,
      });

      const layer = new Konva.default.Layer();
      stage.add(layer);

      console.log(this.instructionList)

      //foreach para percorrer todas as instruções do array
      for (const currentInstruction of this.instructionList) { 
        let newInstruction: any;
        let newText: any;
        let newTextVal1: any

        //Cria representação do inicio do algoritimo
        let startComponent = this.buildComands.buildStartAndFinish(310, 3);
        newText = this.buildComands.buildText(370, 22, 'custom', `Inicio`);
        layer.add(startComponent);
        layer.add(newText);

        //Cria instrução do tipo variable
        if(currentInstruction.type == 'variable'){
          //Cria uma nova instrução através do Konva
          newInstruction = this.buildComands.buildComand(currentInstruction.positionX, currentInstruction.positionY) 
          if(currentInstruction.newVariable.value != undefined){ //Verifica se a instrução foi inicializada com um valor
            //Cria um texto personalizado para a instrução
            newText = this.buildComands.buildText(currentInstruction.positionX + 55, currentInstruction.positionY + 24, 'custom', 
            `${currentInstruction.newVariable.name} = ${currentInstruction.newVariable.value}`);
          }else{
            //Cria um texto personalizado para a instrução mostrando o valor inicial da variável
            newText = this.buildComands.buildText(currentInstruction.positionX + 55, currentInstruction.positionY + 24, 'custom', 
            `${currentInstruction.newVariable.name}`);
          }
          layer.add(newInstruction);
          layer.add(newText);
        }

        //Cria instrução do tipo manipulatorVariable
        if(currentInstruction.type == 'manipulatorVariable'){
          newInstruction = this.buildComands.buildComand(currentInstruction.positionX, currentInstruction.positionY)
          newText = this.buildComands.buildText(currentInstruction.positionX + 55, currentInstruction.positionY + 24, 'custom', 
          `${currentInstruction.variableHandler.name} ${currentInstruction.variableHandler.manipulation} ${currentInstruction.variableHandler.value}`);
          layer.add(newInstruction);
          layer.add(newText);
        }
    
        //Cria instrução do tipo paint
        if(currentInstruction.type == 'paint'){
          newInstruction = this.buildComands.buildComand(currentInstruction.positionX, currentInstruction.positionY)
          newText = this.buildComands.buildText(currentInstruction.positionX + 45, currentInstruction.positionY + 24, 'custom', 
          `Pinte (${currentInstruction.paint.valX}, ${currentInstruction.paint.valY})`);
          layer.add(newInstruction);
          layer.add(newText);
        }

        //Cria instrução do tipo if
        if(currentInstruction.type == 'if'){
          console.log(currentInstruction)
          newInstruction = this.buildComands.builfIf(currentInstruction.positionX, currentInstruction.positionY)
          newText = this.buildComands.buildText(currentInstruction.positionX - 27, currentInstruction.positionY - 30, 'customForOrIf', 
          `   SE \n ${currentInstruction.ifC.valX} \n     ${currentInstruction.ifC.condition} \n ${currentInstruction.ifC.valY}`);
          layer.add(newInstruction);
          layer.add(newText);
          //For para desenhar instruções atreladas a esta
          for (const currentArrayInstruction of currentInstruction.ifC.instructions) {
            if(currentArrayInstruction.type == 'variable'){
              newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY) 
              if(currentArrayInstruction.newVariable.value != undefined){ 
                console.log(newInstruction)
                newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', 
                `${currentArrayInstruction.newVariable.name} = ${currentInstruction.newVariable.value}`);
              }else{
                newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', 
                `${currentArrayInstruction.newVariable.name}`);
              }
              layer.add(newInstruction);
              layer.add(newText);
            }
            if(currentArrayInstruction.type == 'manipulatorVariable'){
              newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', 
              `${currentArrayInstruction.variableHandler.name} ${currentArrayInstruction.variableHandler.manipulation} ${currentArrayInstruction.variableHandler.value}`);
              layer.add(newInstruction);
              layer.add(newText);
            }
            if(currentArrayInstruction.type == 'paint'){
              newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 45, currentArrayInstruction.positionY + 24, 'custom', 
              `Pinte (${currentArrayInstruction.paint.valX}, ${currentArrayInstruction.paint.valY})`);
              layer.add(newInstruction);
              layer.add(newText);
            }
          }
        }

        //Cria instrução do tipo for
        if(currentInstruction.type == 'for'){
          newInstruction = this.buildComands.buildFor(currentInstruction.positionX, currentInstruction.positionY)
          newTextVal1 = this.buildComands.buildText(currentInstruction.positionX - 45, currentInstruction.positionY - 25, 'customForOrIf', `ENQUANTO \n     
          ${currentInstruction.forC.valX} \n        ${currentInstruction.forC.condition} \n     ${currentInstruction.forC.valX}`);
          layer.add(newInstruction);
          layer.add(newTextVal1);
          //For para desenhar instruções atreladas a esta
          for (const currentArrayInstruction of currentInstruction.forC.instructions) {
            if(currentArrayInstruction.type == 'variable'){
              newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY) 
              if(!newInstruction.value){
                console.log(newInstruction)
                newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', 
                `${currentArrayInstruction.newVariable.name} = ${currentInstruction.newVariable.value}`);
              }else{
                newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', 
                `${currentArrayInstruction.newVariable.name}`);
              }
              layer.add(newInstruction);
              layer.add(newText);
            }
            if(currentArrayInstruction.type == 'manipulatorVariable'){
              newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', 
              `${currentArrayInstruction.variableHandler.name} ${currentArrayInstruction.variableHandler.manipulation} ${currentArrayInstruction.variableHandler.value}`);
              layer.add(newInstruction);
              layer.add(newText);
            }   
            if(currentArrayInstruction.type == 'paint'){
              newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 45, currentArrayInstruction.positionY + 24, 'custom', 
              `Pinte (${currentArrayInstruction.paint.valX}, ${currentArrayInstruction.paint.valY})`);
              layer.add(newInstruction);
              layer.add(newText);
            }
          }
        }

        console.log(currentInstruction);
      }
      
      
      let finishtComponent = this.buildComands.buildStartAndFinish(310, heightCanva - 200);
      let newText = this.buildComands.buildText(380, heightCanva - 180, 'custom', `FIM`); //Fazer de forma dinamica
      layer.add(finishtComponent);
      layer.add(newText);

      stage.draw();
    }else if(this.instructionList == undefined){
      const heightCanva = 500

      const stage = new Konva.default.Stage({
        container: 'containerCanvaFlowchart',
        width: 500,
        height: heightCanva,
      });

      const layer = new Konva.default.Layer();
      stage.add(layer);

      console.log(this.instructionList)

      stage.draw();
    }
  }
  
  
}
