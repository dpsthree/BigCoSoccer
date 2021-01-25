import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardsService } from '@bsc/soccer-stats/data-access-guards';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('@bsc/soccer-stats/feature-login').then(
        m => m.SoccerStatsFeatureLoginModule
      )
  },
  {
    path: 'games',
    loadChildren: () =>
      import('@bsc/soccer-stats/feature-game-stats').then(
        m => m.SoccerStatsFeatureGameStatsModule
      ),
    canActivate: environment.e2e ? [] : [GuardsService]
  },
  {
    path: 'players',
    loadChildren: () =>
      import('@bsc/soccer-stats/feature-player-stats').then(
        m => m.SoccerStatsFeaturePlayerStatsModule
      ),
    canActivate: environment.e2e ? [] : [GuardsService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
