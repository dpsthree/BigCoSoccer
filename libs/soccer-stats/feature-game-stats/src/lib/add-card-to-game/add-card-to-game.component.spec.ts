import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardToGameComponent } from './add-card-to-game.component';

describe('AddCardToGameComponent', () => {
  let component: AddCardToGameComponent;
  let fixture: ComponentFixture<AddCardToGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCardToGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
