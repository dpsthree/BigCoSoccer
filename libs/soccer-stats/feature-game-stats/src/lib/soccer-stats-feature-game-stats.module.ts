import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { GameStatsPageComponent } from './game-stats-page/game-stats-page.component';
import { gameStatsReducers } from './state/reducers/reducers';
import { selectedGameIdRouteParamName } from './constants';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MaterialDepsModule } from './material-deps.module';
import { AddGameComponent } from './add-game/add-game.component';

const routes: Routes = [
  {
    path: '',
    component: GameStatsPageComponent,
    children: [
      {
        path: `:${selectedGameIdRouteParamName}`,
        component: GameDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('games', gameStatsReducers),
    MaterialDepsModule
  ],
  declarations: [GameStatsPageComponent, GameDetailComponent, AddGameComponent],
  entryComponents: [AddGameComponent]
})
export class SoccerStatsFeatureGameStatsModule {}
