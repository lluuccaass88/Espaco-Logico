import { Component } from '@angular/core';
import * as Konva from 'konva';
import { BuildComands } from '../../components/BuildComands';
import { Instruction } from 'src/app/model/instruction/Instruction';
import { InstructionService } from 'src/app/service/InstructionService';


@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class FlowchartComponent {

  constructor(private buildComands: BuildComands, private instructionService: InstructionService) {}
  instructionList: any = this.instructionService.getInstructions();

  ngAfterViewInit() {
    const self = this;
    console.log(self.instructionList[self.instructionList.length - 1])

    const heightCanva = self.instructionList[self.instructionList.length - 1].positionY + 500

    const stage = new Konva.default.Stage({
      container: 'containerCanvaFlowchart',
      width: 500,
      height: heightCanva,
    });

    const layer = new Konva.default.Layer();
    stage.add(layer);

    console.log(self.instructionList)

    for (const currentInstruction of self.instructionList) {
      let newInstruction: any;
      let newText: any;
      let newTextVal1: any
      let newTextCondition: any
      let newTextVal2: any


      let startComponent = this.buildComands.buildStartAndFinish(310, 3);
      newText = this.buildComands.buildText(370, 22, 'custom', `Inicio`);
      layer.add(startComponent);
      layer.add(newText);

      if(currentInstruction.type == 'variable'){
        newInstruction = this.buildComands.buildComand(currentInstruction.positionX, currentInstruction.positionY) 
        if(!newInstruction.value){
          console.log(newInstruction)
          newText = this.buildComands.buildText(currentInstruction.positionX + 55, currentInstruction.positionY + 24, 'custom', `${currentInstruction.newVariable.name} = ${currentInstruction.newVariable.value}`);
        }else{
          newText = this.buildComands.buildText(currentInstruction.positionX + 55, currentInstruction.positionY + 24, 'custom', `${currentInstruction.newVariable.name}`);
        }
        layer.add(newInstruction);
        layer.add(newText);
      }


      if(currentInstruction.type == 'manipulatorVariable'){
        newInstruction = this.buildComands.buildComand(currentInstruction.positionX, currentInstruction.positionY)
        newText = this.buildComands.buildText(currentInstruction.positionX + 55, currentInstruction.positionY + 24, 'custom', `${currentInstruction.variableHandler.name} ${currentInstruction.variableHandler.manipulation} ${currentInstruction.variableHandler.value}`);
        layer.add(newInstruction);
        layer.add(newText);
      }
   

      if(currentInstruction.type == 'paint'){
        newInstruction = this.buildComands.buildComand(currentInstruction.positionX, currentInstruction.positionY)
        newText = this.buildComands.buildText(currentInstruction.positionX + 45, currentInstruction.positionY + 24, 'custom', `Pinte (${currentInstruction.paint.valX}, ${currentInstruction.paint.valY})`);
        layer.add(newInstruction);
        layer.add(newText);
      }


      if(currentInstruction.type == 'if'){
        console.log(currentInstruction)
        newInstruction = this.buildComands.builfIf(currentInstruction.positionX, currentInstruction.positionY)
        newText = this.buildComands.buildText(currentInstruction.positionX - 27, currentInstruction.positionY - 30, 'customForOrIf', `   SE \n ${currentInstruction.ifC.valX} \n     ${currentInstruction.ifC.condition} \n ${currentInstruction.ifC.valY}`);
        layer.add(newInstruction);
        layer.add(newText);


        for (const currentArrayInstruction of currentInstruction.ifC.instructions) {
          if(currentArrayInstruction.type == 'variable'){
            newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY) 
            if(!newInstruction.value){
              console.log(newInstruction)
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', `${currentArrayInstruction.newVariable.name} = ${currentInstruction.newVariable.value}`);
            }else{
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', `${currentArrayInstruction.newVariable.name}`);
            }
            layer.add(newInstruction);
            layer.add(newText);
          }
    
          if(currentArrayInstruction.type == 'manipulatorVariable'){
            newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
            newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', `${currentArrayInstruction.variableHandler.name} ${currentArrayInstruction.variableHandler.manipulation} ${currentArrayInstruction.variableHandler.value}`);
            layer.add(newInstruction);
            layer.add(newText);
          }
       
          if(currentArrayInstruction.type == 'paint'){
            newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
            newText = this.buildComands.buildText(currentArrayInstruction.positionX + 45, currentArrayInstruction.positionY + 24, 'custom', `Pinte (${currentArrayInstruction.paint.valX}, ${currentArrayInstruction.paint.valY})`);
            layer.add(newInstruction);
            layer.add(newText);
          }
        }
      }

      if(currentInstruction.type == 'for'){
        newInstruction = this.buildComands.buildFor(currentInstruction.positionX, currentInstruction.positionY)
        newTextVal1 = this.buildComands.buildText(currentInstruction.positionX - 45, currentInstruction.positionY - 25, 'customForOrIf', `ENQUANTO \n     ${currentInstruction.forC.valX} \n        ${currentInstruction.forC.condition} \n     ${currentInstruction.forC.valX}`);
        // newTextCondition = this.buildComands.buildText(currentInstruction.positionX - 45, currentInstruction.positionY - 25, 'customForOrIf', `ENQUANTO \n ${currentInstruction.forC.valX} for \n ${currentInstruction.forC.condition} \n ${currentInstruction.forC.valX}`);
        // newTextVal2 = this.buildComands.buildText(currentInstruction.positionX - 45, currentInstruction.positionY - 25, 'customForOrIf', `ENQUANTO \n ${currentInstruction.forC.valX} for \n ${currentInstruction.forC.condition} \n ${currentInstruction.forC.valX}`);
        layer.add(newInstruction);
        layer.add(newTextVal1);
        // layer.add(newTextCondition);
        // layer.add(newTextVal2);

        for (const currentArrayInstruction of currentInstruction.forC.instructions) {
          if(currentArrayInstruction.type == 'variable'){
            newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY) 
            if(!newInstruction.value){
              console.log(newInstruction)
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', `${currentArrayInstruction.newVariable.name} = ${currentInstruction.newVariable.value}`);
            }else{
              newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', `${currentArrayInstruction.newVariable.name}`);
            }
            layer.add(newInstruction);
            layer.add(newText);
          }
    
          if(currentArrayInstruction.type == 'manipulatorVariable'){
            newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
            newText = this.buildComands.buildText(currentArrayInstruction.positionX + 55, currentArrayInstruction.positionY + 24, 'custom', `${currentArrayInstruction.variableHandler.name} ${currentArrayInstruction.variableHandler.manipulation} ${currentArrayInstruction.variableHandler.value}`);
            layer.add(newInstruction);
            layer.add(newText);
          }
       
          if(currentArrayInstruction.type == 'paint'){
            newInstruction = this.buildComands.buildComand(currentArrayInstruction.positionX, currentArrayInstruction.positionY)
            newText = this.buildComands.buildText(currentArrayInstruction.positionX + 45, currentArrayInstruction.positionY + 24, 'custom', `Pinte (${currentArrayInstruction.paint.valX}, ${currentArrayInstruction.paint.valY})`);
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

  }
  
  
}
