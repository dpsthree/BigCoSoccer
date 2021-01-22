import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerToGameComponent } from './add-player-to-game.component';

describe('AddPlayerToGameComponent', () => {
  let component: AddPlayerToGameComponent;
  let fixture: ComponentFixture<AddPlayerToGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlayerToGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
