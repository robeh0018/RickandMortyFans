import {Routes} from "@angular/router";
import {EpisodesGuard} from "./episodes/episodes.guard";

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'episodes', pathMatch: "full"},
  {
    providers: [EpisodesGuard],
    path: 'episodes',
    loadChildren: () => import('./episodes/episodes.routes').then(r => r.EpisodesRoutes)
  },
  {path: 'characters', loadChildren: () => import('./characters/characters.routes').then(r => r.CharactersRoutes)},
]
