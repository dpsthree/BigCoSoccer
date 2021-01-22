import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayerStatsPageComponent } from './player-stats-page/player-stats-page.component';
import { selectedPlayerIdRouteParamName } from './constants';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MaterialDepsModule } from './material-deps.module';
import { AddPlayerComponent } from './add-player/add-player.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerStatsPageComponent,
    children: [
      {
        path: `:${selectedPlayerIdRouteParamName}`,
        component: PlayerDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialDepsModule
  ],
  declarations: [
    PlayerStatsPageComponent,
    PlayerDetailComponent,
    AddPlayerComponent
  ]
})
export class SoccerStatsFeaturePlayerStatsModule {}
