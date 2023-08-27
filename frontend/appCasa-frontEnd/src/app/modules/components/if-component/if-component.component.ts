import { of, Observable } from "rxjs";
import { Component } from '@angular/core';
import * as Konva from 'konva';

import { Comand } from 'src/app/model/Comand';

@Component({
  selector: 'app-if-component',
  templateUrl: './if-component.component.html',
  styleUrls: ['./if-component.component.css']
})
export class IfComponentComponent {

  ngAfterViewInit() {
    const stage = new Konva.default.Stage({
      container: 'containerCanva',
      width: 300,
      height: 110,
    });

    const layer = new Konva.default.Layer();
    stage.add(layer);

    var triangle = new Konva.default.Shape({
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.moveTo(155, 20); // Ponto inferior central
        context.lineTo(50, 150); // Canto inferior esquerdo
        context.lineTo(255, 150); // Canto inferior direito
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      },
      fill: '#00D2FF',
      text: 'Texto no Triângulo',
      fontSize: 16,
      fontFamily: 'Arial',
    });

    layer.add(triangle);

    var title = new Konva.default.Text({
      x: 140,
      y: 65,
      text: 'SE',
      fontSize: 25,
      fontFamily: 'Roboto',
      fill: 'black'
    });

    layer.add(title);
    stage.draw();
  }
  
}
