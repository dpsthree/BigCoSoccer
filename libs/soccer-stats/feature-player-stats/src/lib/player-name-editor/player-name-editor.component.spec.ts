import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNameEditorComponent } from './player-name-editor.component';

describe('PlayerNameEditorComponent', () => {
  let component: PlayerNameEditorComponent;
  let fixture: ComponentFixture<PlayerNameEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerNameEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerNameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
