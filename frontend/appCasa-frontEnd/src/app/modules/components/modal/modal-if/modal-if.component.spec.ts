import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIfComponent } from './modal-if.component';

describe('ModalIfComponent', () => {
  let component: ModalIfComponent;
  let fixture: ComponentFixture<ModalIfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalIfComponent]
    });
    fixture = TestBed.createComponent(ModalIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
