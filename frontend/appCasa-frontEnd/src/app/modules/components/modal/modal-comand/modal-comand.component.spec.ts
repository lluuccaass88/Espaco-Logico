import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComandComponent } from './modal-comand.component';

describe('ModalComandComponent', () => {
  let component: ModalComandComponent;
  let fixture: ComponentFixture<ModalComandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComandComponent]
    });
    fixture = TestBed.createComponent(ModalComandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
