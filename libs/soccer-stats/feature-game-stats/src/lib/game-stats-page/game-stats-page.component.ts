import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { GameStatsState } from '../types';
import { getCount } from '../state/selectors/count.selectors';
import { incrementCount } from '../state/actions/count.actions';

@Component({
  selector: 'bsc-game-stats-page',
  templateUrl: './game-stats-page.component.html',
  styleUrls: ['./game-stats-page.component.scss']
})
export class GameStatsPageComponent {
  count = this.store.pipe(select(getCount));
  constructor(private store: Store<GameStatsState>) {}

  click(){
    this.store.dispatch(incrementCount());
  }
}
