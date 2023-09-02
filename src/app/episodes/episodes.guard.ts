import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {EpisodesService} from "./episodes.service";
import {Observable} from "rxjs";

@Injectable()

export class EpisodesGuard implements CanActivate {

  constructor(public episodesService: EpisodesService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const id = +route.paramMap.get('id')!

    if (this.episodesService.getEpisodes().getValue().length + 1 <= id || Number.isNaN(id)) {
      return this.router.navigate(['episodes']);
    }

    return true;
  }
}

// export const canActiveDetails: CanActivateFn = (route, state) => {
//
//   const episodesService = inject(EpisodesService);
//   const router = inject(Router);
//
//   const id = +route.paramMap.get('id')!
//
//   if (episodesService.episodes$.getValue().length + 1 <= id || Number.isNaN(id)) {
//     return router.navigate(['episodes']);
//   }
//
//   return true;
// }
