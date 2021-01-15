import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  {
    path: 'games',
    loadChildren: () =>
      import('@bsc/soccer-stats/feature-game-stats').then(
        m => m.SoccerStatsFeatureGameStatsModule
      )
  },
  {
    path: 'players',
    loadChildren: () =>
      import('@bsc/soccer-stats/feature-player-stats').then(
        m => m.SoccerStatsFeaturePlayerStatsModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
