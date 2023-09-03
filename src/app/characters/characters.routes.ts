import {Routes} from "@angular/router";
import {CharactersListComponent} from "./characters-list/characters-list.component";
import {CharactersGuard} from "./characters.guard";

export const CharactersRoutes: Routes = [
  {
    path: '',
    component: CharactersListComponent,
  },
  {

    canActivate: [CharactersGuard],
    path: ':id',
    loadComponent: () => import('./character-details/character-details.component').then(c => c.CharacterDetailsComponent)
  },

]
