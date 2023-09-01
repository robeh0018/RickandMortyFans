import {Routes} from "@angular/router";
import {EpisodesListComponent} from "./episodes-list/episodes-list.component";
import {EpisodesGuard} from "./episodes.guard";

export const EpisodesRoutes: Routes = [
  {
    path: '',
    component: EpisodesListComponent,
  },
  {
    path: ':id',
    loadComponent: () => import('./episode-details/episode-details.component').then(c => c.EpisodeDetailsComponent),
    canActivate: [EpisodesGuard]
  },


]
