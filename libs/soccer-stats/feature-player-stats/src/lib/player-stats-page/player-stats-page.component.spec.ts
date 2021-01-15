import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatsPageComponent } from './player-stats-page.component';

describe('PlayerStatsPageComponent', () => {
  let component: PlayerStatsPageComponent;
  let fixture: ComponentFixture<PlayerStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerStatsPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
