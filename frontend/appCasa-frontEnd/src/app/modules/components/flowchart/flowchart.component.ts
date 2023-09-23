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

    const stage = new Konva.default.Stage({
      container: 'containerCanvaFlowchart',
      width: 800,
      height: 800,
    });

    const layer = new Konva.default.Layer();
    stage.add(layer);

    console.log(self.instructionList)

    for (const currentInstruction of self.instructionList) {
      let newInstruction: any;
      let newText: any;

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


      if(currentInstruction.type == 'variablemanipulatorVariable'){
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
        newText = this.buildComands.buildText(currentInstruction.positionX - 12, currentInstruction.positionY - 10, 'custom', `SE ${currentInstruction.ifC.valX} ${currentInstruction.ifC.condition} ${currentInstruction.ifC.valX}`);
        layer.add(newInstruction);
        layer.add(newText);


        for (const currentArrayInstruction of currentInstruction.ifC.intructions) {
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
    
          if(currentArrayInstruction.type == 'variablemanipulatorVariable'){
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
        newText = this.buildComands.buildText(currentInstruction.positionX - 12, currentInstruction.positionY - 10, 'custom', `ENQUANTO ${currentInstruction.forC.valX} for ${currentInstruction.forC.condition} de ${currentInstruction.forC.valX}`);
        layer.add(newInstruction);
        layer.add(newText);
      }

      console.log(currentInstruction);
    }
    
    
    let finishtComponent = this.buildComands.buildStartAndFinish(310, 709);
    let newText = this.buildComands.buildText(375, 728, 'custom', `FIM`); //Fazer de forma dinamica
    layer.add(finishtComponent);
    layer.add(newText);

    // let comandComponent = this.buildComands.buildStartAndFinish(310, 3);

    // let comandIf = this.buildComands.buildFor(400, 170)
    
    
    // let comandComponentIf1 = this.buildComands.buildComand(120, 250, true);

    // let comandComponentIf2 = this.buildComands.buildComand(120, 350, true);
    // let comandComponentIf3 = this.buildComands.buildComand(120, 450, true);

    // let comandComponent2 = this.buildComands.buildComand(310, 550);

    // let comandComponent3 = this.buildComands.buildStartAndFinish(310, 650);


    // layer.add(comandComponent);
    // layer.add(comandIf)
    // layer.add(comandComponentIf1)
    // layer.add(comandComponentIf2)
    // layer.add(comandComponentIf3)
    // layer.add(comandComponent2)
    // layer.add(comandComponent3)
    stage.draw();

  }
  
  
}
