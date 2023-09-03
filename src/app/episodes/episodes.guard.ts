import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {EpisodesService} from "./episodes.service";
import {Observable} from "rxjs";

@Injectable()

export class EpisodesGuard implements CanActivate {

  constructor(private episodesService: EpisodesService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const id = +route.paramMap.get('id')!;
    const episodeSelected = this.episodesService.getEpisodeById(id);

    if (!episodeSelected || Number.isNaN(id)) {
      return this.router.navigate(['episodes']);
    }

    return true;
  }
}
