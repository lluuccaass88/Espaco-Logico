import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandComponentComponent } from './comand-component.component';

describe('ComandComponentComponent', () => {
  let component: ComandComponentComponent;
  let fixture: ComponentFixture<ComandComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComandComponentComponent]
    });
    fixture = TestBed.createComponent(ComandComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
