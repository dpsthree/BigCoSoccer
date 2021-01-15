import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsPageComponent } from './game-stats-page.component';

describe('GameStatsPageComponent', () => {
  let component: GameStatsPageComponent;
  let fixture: ComponentFixture<GameStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
