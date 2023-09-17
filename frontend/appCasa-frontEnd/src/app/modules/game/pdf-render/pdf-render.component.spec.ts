import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfRenderComponent } from './pdf-render.component';

describe('PdfRenderComponent', () => {
  let component: PdfRenderComponent;
  let fixture: ComponentFixture<PdfRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfRenderComponent]
    });
    fixture = TestBed.createComponent(PdfRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
