import { Component } from '@angular/core';
import { BuildComands } from '../../components/BuildComands';
import * as Konva from 'konva';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent {
  showModal:number = 10;

  constructor(private buildComands: BuildComands) {}
  

  ngAfterViewInit() {
    const self = this;

    const stage = new Konva.default.Stage({
      container: 'containerCanva',
      width: 300,
      height: 400,
    });

    const layer = new Konva.default.Layer();
    stage.add(layer);

   let comandComponent = this.buildComands.buildComand(70, 3);
   let comandTextComponent = this.buildComands.buildText(100, 25, 'comand');
   
   let ifComponent = this.buildComands.builfIf(150, 165);
   let ifTextComponent = this.buildComands.buildText(138, 155, 'if');

   let forComponent = this.buildComands.buildFor(152, 330);  
   let forTextComponent = this.buildComands.buildText(100, 320, 'for');

    layer.add(comandComponent);
    layer.add(comandTextComponent);

    layer.add(ifComponent);
    layer.add(ifTextComponent);

    layer.add(forComponent);
    layer.add(forTextComponent);
    stage.draw();

    comandComponent.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    comandComponent.on('mouseout', function () {
      document.body.style.cursor = 'default'; // Ou o cursor padrão que desejar
    });
    comandTextComponent.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    comandTextComponent.on('mouseout', function () {
      document.body.style.cursor = 'default'; // Ou o cursor padrão que desejar
    });


    ifComponent.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    ifComponent.on('mouseout', function () {
      document.body.style.cursor = 'default'; // Ou o cursor padrão que desejar
    });
    ifTextComponent.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    ifTextComponent.on('mouseout', function () {
      document.body.style.cursor = 'default'; // Ou o cursor padrão que desejar
    });


    forComponent.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    forComponent.on('mouseout', function () {
      document.body.style.cursor = 'default'; // Ou o cursor padrão que desejar
    });
    forTextComponent.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    forTextComponent.on('mouseout', function () {
      document.body.style.cursor = 'default'; // Ou o cursor padrão que desejar
    });


    comandComponent.on('click', function () {
      console.log("Command")
      self.showModal = 0
      console.log(self.showModal)
    });    
    
    ifComponent.on('click', function () {
      console.log("if")
      self.showModal = 1
    });

    forComponent.on('click', function () {
      console.log("for")
      self.showModal = 2
    });
  }
}
