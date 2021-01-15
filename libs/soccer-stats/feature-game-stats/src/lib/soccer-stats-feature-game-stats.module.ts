import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GameStatsPageComponent } from './game-stats-page/game-stats-page.component';

const routes: Routes = [{ path: '', component: GameStatsPageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [GameStatsPageComponent]
})
export class SoccerStatsFeatureGameStatsModule {}
