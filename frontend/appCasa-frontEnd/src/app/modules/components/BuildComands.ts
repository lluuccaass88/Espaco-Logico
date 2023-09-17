import * as Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { Rect } from 'konva/lib/shapes/Rect';

export class BuildComands{    

    builfIf(posX:number, posY:number):Shape<ShapeConfig>{
        return new Konva.default.RegularPolygon({
          x: posX,
          y: posY,
          sides: 4,
          radius: 70,
          fill: '#131DFF'
        });
    }

    buildComand(posX:number, posY:number): Shape<ShapeConfig>{
        return new Konva.default.Rect({
            x: posX,
            y: posY,
            width: 170,
            height: 65,
            fill: '#FFC700',
            strokeWidth: 4,
            cornerRadius: 15 // Ajuste o valor conforme necessário
          });
    }

    buildFor(posX:number, posY:number): Shape<ShapeConfig>{
      return new Konva.default.RegularPolygon({
        x: posX,
        y: posY,
        sides: 6,
        radius: 70,
        fill: 'red'
      });
      
    }

    buildText(posX:number, posY:number, type:String): Shape<ShapeConfig>{
      switch(type){
        case 'comand':
          return new Konva.default.Text({
            x: posX,
            y: posY,
            text: 'Comando',
            fontSize: 20,
            fontFamily: 'Arial',
            fill: 'white',
            fontStyle: 'bold'
          });
        break;
        case 'if':
          return new Konva.default.Text({
            x: posX,
            y: posY,
            text: 'SE',
            fontSize: 20,
            fontFamily: 'Arial',
            fill: 'white',
            fontStyle: 'bold'
          });
        break;
        case 'for':
          return new Konva.default.Text({
            x: posX,
            y: posY,
            text: 'ENQUANTO',
            fontSize: 18,
            fontFamily: 'Arial',
            fill: 'white',
            fontStyle: 'bold'
          });
        break;
      }  

      return new Konva.default.Text({
        x: posX,
        y: posY,
        text: 'ERRO',
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'black',
        fontStyle: 'bold'

      });;
  }


}


// context.moveTo(155, 20); // Ponto inferior central
//               context.lineTo(50, 150); // Canto inferior esquerdo
//               context.lineTo(255, 150); // Canto inferior direito




// context.moveTo(topB, topA); // Ponto inferior central
// context.lineTo(leftB, leftA); // Canto inferior esquerdo
// context.lineTo(rightB, rightA); // Canto inferior direito
