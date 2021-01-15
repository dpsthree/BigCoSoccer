import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PlayerStatsPageComponent } from './player-stats-page/player-stats-page.component';

const routes: Routes = [{ path: '', component: PlayerStatsPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PlayerStatsPageComponent]
})
export class SoccerStatsFeaturePlayerStatsModule {}
