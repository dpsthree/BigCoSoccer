import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'bsc-player-name-editor',
  templateUrl: './player-name-editor.component.html',
  styleUrls: ['./player-name-editor.component.scss']
})
export class PlayerNameEditorComponent implements AfterViewChecked {
  @Input() set playerName(p: string) {
    this.playerNameEdit.setValue(p);
    this.playerNameCache = p;
  }
  @Output() playerNameChanged = new EventEmitter<string>();
  @ViewChild(MatInput, { static: true }) input!: MatInput;

  playerNameCache!: string;
  playerNameEdit = new FormControl('', Validators.required);
  editing = false;

  startEditingName() {
    this.editing = true;
  }

  ngAfterViewChecked() {
    if (this.input && !this.input.focused) {
      setTimeout(() => this.input.focus());
    }
  }

  save() {
    this.editing = false;
    if (this.playerNameEdit.valid) {
      if (this.playerNameCache !== this.playerNameEdit.value) {
        this.playerNameChanged.emit(this.playerNameEdit.value);
        this.playerNameCache = this.playerNameEdit.value;
      }
    } else {
      this.playerNameEdit.setValue(this.playerNameCache);
    }
  }
}
