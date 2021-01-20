import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { GameStatsPageComponent } from './game-stats-page/game-stats-page.component';
import { gameStatsReducers } from './state/reducers/reducers';

const routes: Routes = [{ path: '', component: GameStatsPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), StoreModule.forFeature('games', gameStatsReducers)],
  declarations: [GameStatsPageComponent]
})
export class SoccerStatsFeatureGameStatsModule {}
