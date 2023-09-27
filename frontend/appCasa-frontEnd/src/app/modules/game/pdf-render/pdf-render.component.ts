import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-render',
  templateUrl: './pdf-render.component.html',
  styleUrls: ['./pdf-render.component.css']
})
export class PdfRenderComponent {
  pdfSrc = '../../../../assets/roles/regras_v1.pdf';

constructor( private router: Router){}

  public backHandler(){
    this.router.navigate(['/game']);
  }
}
