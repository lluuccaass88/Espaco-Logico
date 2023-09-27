import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIntroductionComponent } from './game-introduction.component';

describe('GameIntroductionComponent', () => {
  let component: GameIntroductionComponent;
  let fixture: ComponentFixture<GameIntroductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameIntroductionComponent]
    });
    fixture = TestBed.createComponent(GameIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
