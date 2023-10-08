import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Konva from 'konva';
import { InstructionService } from 'src/app/service/InstructionService';

@Component({
  selector: 'app-game-test',
  templateUrl: './game-test.component.html',
  styleUrls: ['./game-test.component.css']
})
export class GameTestComponent {
  constructor (private instructionService: InstructionService, private router: Router) {}

  public nextPhase() {
    this.router.navigate(['/test']);
  }

  public tryAgain() {
    this.router.navigate(['/test']);
  }

  async ngAfterViewInit() {
    const self = this;

    let algorithm: any = []
    algorithm = await (this.instructionService.testAlgorithm())

    console.log(algorithm)

    const stage = new Konva.Stage({
      container: 'containerCanva',
      width: 500,
      height: 500,
    });

    var layer = new Konva.Layer();

    // Define o número de linhas e colunas
    const numRows = 10;
    const numCols = 10;
    
    // Define a largura das linhas e o espaço entre elas
    const lineWidth = 5;
    const spacing = (stage.width() - lineWidth) / numCols; // Ajuste para o espaço total entre as linhas

    // Crie as linhas verticais usando um loop
    for (let col = 0; col <= numCols; col++) {
      const x = col * spacing; // Ajusta a posição
      const verticalLine = new Konva.Line({
        points: [x, 0, x, stage.height()],
        stroke: 'white',
        strokeWidth: lineWidth,
      });

      layer.add(verticalLine);
    }

    // Crie as linhas horizontais usando um loop aninhado
    for (let row = 0; row <= numRows; row++) {
      const y = row * spacing; // Ajusta a posição
      const horizontalLine = new Konva.Line({
        points: [0, y, stage.width(), y],
        stroke: 'white',
        strokeWidth: lineWidth,
      });

      layer.add(horizontalLine);
    }

    // Pinte a célula na posição 1x1 (a primeira célula no canto superior esquerdo)
    const cellSize = spacing - lineWidth; // O tamanho da célula é igual ao espaço entre as linhas menos a largura das linhas
    
    console.log(algorithm)

    if(algorithm){
      for(const currentStriction of algorithm){

        console.log(currentStriction[0])
        console.log(currentStriction[1])
  
  
        const cell = new Konva.Rect({
          x: spacing * currentStriction[1] - cellSize, // Posição x da célula
          y: spacing * currentStriction[0] - cellSize, // Posição y da célula
          width: cellSize, // Largura da célula
          height: cellSize, // Altura da célula
          fill: 'green', // Cor de preenchimento
        });
        layer.add(cell);
      }
    }

    stage.add(layer);

  }
}
