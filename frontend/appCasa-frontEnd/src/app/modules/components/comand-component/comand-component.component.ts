import { Component } from '@angular/core';
import * as Konva from 'konva';

import { Comand } from 'src/app/model/Comand';

@Component({
  selector: 'comand-component',
  templateUrl: './comand-component.component.html',
  styleUrls: ['./comand-component.component.css']
})
export class ComandComponentComponent {
  
  ngAfterViewInit() {
    const stage = new Konva.default.Stage({
      container: 'containerCanva1',
      width: 700,
      height: 100,
    });

    const layer = new Konva.default.Layer();
    stage.add(layer);

    var rect1 = new Konva.default.Rect({
      x: 270,
      y: 5,
      width: 170,
      height: 65,
      fill: '#FFC700',
      strokeWidth: 4,
      cornerRadius: 15 // Ajuste o valor conforme necessário
    });

    layer.add(rect1);

    var title = new Konva.default.Text({
      x: 292,
      y: 25,
      text: 'PINTE(X, Y)',
      fontSize: 25,
      fontFamily: 'Roboto',
      fill: 'black'
    });

    layer.add(title);
    stage.draw();
  }

}
