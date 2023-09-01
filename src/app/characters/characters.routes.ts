import {Routes} from "@angular/router";

export const CharactersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./characters-list/characters-list.component').then(c => c.CharactersListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./character-details/character-details.component').then(c => c.CharacterDetailsComponent)
  },

]
