import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { GameEffects} from '@bsc/soccer-stats/data-access-app-state';

import { selectedGameIdRouteParamName } from './constants';
import { GameStatsPageComponent } from './game-stats-page/game-stats-page.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MaterialDepsModule } from './material-deps.module';
import { AddGameComponent } from './add-game/add-game.component';
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
    EffectsModule.forFeature([GameEffects]),
    MaterialDepsModule
  ],
  declarations: [GameStatsPageComponent, GameDetailComponent, AddGameComponent, PlayerListComponent, ShotListComponent, CardListComponent],
  entryComponents: [AddGameComponent]
})
export class SoccerStatsFeatureGameStatsModule {}
