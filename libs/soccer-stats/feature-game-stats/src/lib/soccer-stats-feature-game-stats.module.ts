import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { featureSelectorName, selectedGameIdRouteParamName } from './constants';

import { GameStatsPageComponent } from './game-stats-page/game-stats-page.component';
import { gameStatsReducer } from './state/reducers/reducers';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MaterialDepsModule } from './material-deps.module';
import { AddGameComponent } from './add-game/add-game.component';
import { GamesEffects } from './state/effects/games.effects';
import { EffectsModule } from '@ngrx/effects';
import { PlayerListComponent } from './player-list/player-list.component';
import { ShotListComponent } from './shot-list/shot-list.component';
import { CardListComponent } from './card-list/card-list.component';

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
    StoreModule.forFeature(featureSelectorName, gameStatsReducer),
    EffectsModule.forFeature([GamesEffects]),
    MaterialDepsModule
  ],
  declarations: [GameStatsPageComponent, GameDetailComponent, AddGameComponent, PlayerListComponent, ShotListComponent, CardListComponent],
  entryComponents: [AddGameComponent]
})
export class SoccerStatsFeatureGameStatsModule {}
