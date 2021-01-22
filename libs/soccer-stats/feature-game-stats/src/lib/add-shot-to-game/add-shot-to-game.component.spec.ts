import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShotToGameComponent } from './add-shot-to-game.component';

describe('AddShotToGameComponent', () => {
  let component: AddShotToGameComponent;
  let fixture: ComponentFixture<AddShotToGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddShotToGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShotToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
