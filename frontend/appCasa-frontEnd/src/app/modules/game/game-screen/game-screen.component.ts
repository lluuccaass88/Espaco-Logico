import { Component, Output, EventEmitter } from '@angular/core';
import { BuildComands } from '../../components/BuildComands';
import * as Konva from 'konva';
import { InstructionService } from 'src/app/service/InstructionService';
import { Router } from '@angular/router';
import { LevelService } from 'src/app/service/LevelService';
import { Level } from 'src/app/model/Level';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent {
  @Output() showModalChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() showErrorMessageInstruction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() errorMessageInstruction: EventEmitter<String> = new EventEmitter<String>();
  

  showModal:number = 10;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  level?: Level;
  questionLevel?: string

  constructor(private buildComands: BuildComands, private instructionService: InstructionService, 
      private router: Router, private levelService: LevelService) {}

  async ngAfterViewInit() {
        // - limpa localstorage
    // localStorage.removeItem('instructionList') 
    const self = this;
    let respTest: any

    respTest = await (await self.findCurrentLevel());
     self.questionLevel = respTest[0].question

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
      self.showModal = 0
      self.showModalChange.emit(self.showModal)
    });    
    comandTextComponent.on('click', ()=>{
      self.showModal = 0
    })
    
    ifComponent.on('click', function () {
      self.showModal = 1
    });
    ifTextComponent.on('click', ()=>{
      self.showModal = 1
    })

    forComponent.on('click', function () {
      self.showModal = 2
    });
    forTextComponent.on('click', ()=>{
      self.showModal = 2
    })

  }

  public testAlgorithm(){
    this.instructionService.testAlgorithm()
    this.router.navigate(['/test']);
  }

  public async findCurrentLevel(){
    const userId = localStorage.getItem('authToken');
    const response = (await this.levelService.getLevel(userId))

    return response
  }

}
