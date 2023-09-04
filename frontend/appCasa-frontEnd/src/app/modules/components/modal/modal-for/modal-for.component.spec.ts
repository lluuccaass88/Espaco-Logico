import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForComponent } from './modal-for.component';

describe('ModalForComponent', () => {
  let component: ModalForComponent;
  let fixture: ComponentFixture<ModalForComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalForComponent]
    });
    fixture = TestBed.createComponent(ModalForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
