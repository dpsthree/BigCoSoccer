import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUtilTranslationConfigModule } from '@bsc/shared/util-translation-config';

import { PlayerStatsPageComponent } from './player-stats-page/player-stats-page.component';
import { selectedPlayerIdRouteParamName } from './constants';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MaterialDepsModule } from './material-deps.module';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerNameEditorComponent } from './player-name-editor/player-name-editor.component';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects, PlayerEffects } from '@bsc/soccer-stats/data-access-app-state';

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
    EffectsModule.forFeature([GameEffects, PlayerEffects]),
    MaterialDepsModule,
    SharedUtilTranslationConfigModule.forChild('featurePlayerStats')
  ],
  declarations: [
    PlayerStatsPageComponent,
    PlayerDetailComponent,
    AddPlayerComponent,
    PlayerNameEditorComponent
  ]
})
export class SoccerStatsFeaturePlayerStatsModule {}
