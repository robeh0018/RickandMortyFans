import {Routes} from "@angular/router";
import {EpisodesGuard} from "./episodes/episodes.guard";
import {CharactersGuard} from "./characters/characters.guard";

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'episodes', pathMatch: "full"},
  {
    providers: [EpisodesGuard],
    path: 'episodes',
    loadChildren: () => import('./episodes/episodes.routes').then(r => r.EpisodesRoutes)
  },
  {
    providers: [CharactersGuard],
    path: 'characters',
    loadChildren: () => import('./characters/characters.routes').then(r => r.CharactersRoutes)
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.routes').then(r => r.LocationsRoutes)
  },
]
