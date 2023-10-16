import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Konva from 'konva';
import { InstructionService } from 'src/app/service/InstructionService';
import { LevelService } from 'src/app/service/LevelService';

@Component({
  selector: 'app-game-test',
  templateUrl: './game-test.component.html',
  styleUrls: ['./game-test.component.css']
})
export class GameTestComponent {
  constructor (private instructionService: InstructionService, private router: Router, private levelService: LevelService) {}

  correcAnswer?: boolean

  public async nextPhase() {
    localStorage.removeItem('instructionList') 
    
    await (await this.levelService.nextLevel(localStorage.getItem('authToken')))

    this.router.navigate(['/game']);
  }

  public tryAgain() {
    this.router.navigate(['/game']);
  }

  async ngAfterViewInit() {
    const self = this;

    let algorithm: any = []
    let checkAnswer: Boolean;

    algorithm = await (this.instructionService.testAlgorithm())
    self.correcAnswer = await (this.instructionService.checkAlgorithm(algorithm))

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

    if (algorithm) {
      // Verifica se a variável "algorithm" não é nula
      for (const currentStriction of algorithm) {
        // Inicia um loop foreach para percorrendo todo o array algorithm
        const cell = new Konva.Rect({ // Cria uma nova instância de um retângulo da biblioteca Konva 
          // Define a posição x da célula com base na multiplicação do valor "spacing" pela segunda parte do elemento atual em "algorithm" e subtrai "cellSize"          
          x: spacing * currentStriction[1] - cellSize,
          // Define a posição y da célula com base na multiplicação do valor "spacing" pela primeira parte do elemento atual em "algorithm" e subtrai "cellSize"
          y: spacing * currentStriction[0] - cellSize,
          // Define a largura da célula como "cellSize"
          width: cellSize,
          // Define a altura da célula como "cellSize"
          height: cellSize,
          // Define a cor de preenchimento da célula como 'green' (verde)
          fill: 'green',
        });
        // Adiciona o retângulo "cell" à camada (layer) do Konva
        layer.add(cell);
      }
    }
    

    stage.add(layer);
  }
}
