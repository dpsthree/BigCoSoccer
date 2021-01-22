import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import {
  GameEffects,
  PlayerEffects
} from '@bsc/soccer-stats/data-access-app-state';

import { selectedGameIdRouteParamName } from './constants';
import { GameStatsPageComponent } from './game-stats-page/game-stats-page.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MaterialDepsModule } from './material-deps.module';
import { AddGameComponent } from './add-game/add-game.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ShotListComponent } from './shot-list/shot-list.component';
import { CardListComponent } from './card-list/card-list.component';
import { AddPlayerToGameComponent } from './add-player-to-game/add-player-to-game.component';
import { AddShotToGameComponent } from './add-shot-to-game/add-shot-to-game.component';
import { AddCardToGameComponent } from './add-card-to-game/add-card-to-game.component';

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
    EffectsModule.forFeature([GameEffects, PlayerEffects]),
    MaterialDepsModule
  ],
  declarations: [
    GameStatsPageComponent,
    GameDetailComponent,
    AddGameComponent,
    PlayerListComponent,
    ShotListComponent,
    CardListComponent,
    AddPlayerToGameComponent,
    AddShotToGameComponent,
    AddCardToGameComponent
  ],
  entryComponents: [
    AddGameComponent,
    AddPlayerToGameComponent,
    AddShotToGameComponent,
    AddCardToGameComponent
  ]
})
export class SoccerStatsFeatureGameStatsModule {}
