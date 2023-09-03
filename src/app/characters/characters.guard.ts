import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {CharactersService} from "./characters.service";


@Injectable()

export class CharactersGuard implements CanActivate {

  constructor(public charactersService: CharactersService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const id = +route.paramMap.get('id')!;
    const characterSelected = this.charactersService.getCharacterById(id);

    if (!characterSelected || Number.isNaN(id)) {
      return this.router.navigate(['characters']);
    }

    return true;
  }


}
