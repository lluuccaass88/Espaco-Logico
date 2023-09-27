import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-introduction',
  templateUrl: './game-introduction.component.html',
  styleUrls: ['./game-introduction.component.css']
})
export class GameIntroductionComponent {
  constructor(private router: Router) {}

  dialogueArray: Array<string> = [
    "Ola, tudo bem? Que bom que você chegou. Agora temos esperança de voltar para a casa.", 
    "Velnor o conquistador, invadiu nosso planeta, e implantou uma bomba no meio do nosos planeta. A populaão foi evacuada por segurança", 
    "Precisamos acessar e destruir o nucleo da bomba, para assim podermos voltar para a casa.",
    "Ai que entra sua ajuda, você precisa completar os desafios deixados por Velnor para assim acessarmos o nucleo da bomba.",
    "Vamos compartilhar com você todas as informações que coletamos a respeito dos desáfios de Velnor."
  ];
  cont: number = 0;
  dialogue: String = this.dialogueArray[0]

  public handleNextDialogue() {
    if(this.dialogueArray.length > this.cont +1){
      this.cont++
      this.dialogue = this.dialogueArray[this.cont]
    }else{
      this.router.navigate(['/game']);
    }    
  };

  public handleviewPdf(){
    this.router.navigate(['/pdfView']);
  }

}
