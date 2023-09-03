import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Episode} from "./episode.model";
import {BehaviorSubject, map} from "rxjs";
import {CharactersService} from "../characters/characters.service";
import {findIdsFormUrls} from "../helpers/findIdsFormUrls";

interface ApiResponse {
  "info": {
    "count": number,
    "pages": number,
    "next": string,
    "prev": string
  },
  "results": { id: number, name: string, air_date: string, characters: string[] }[]
}

@Injectable({providedIn: "root"})

export class EpisodesService {

  #episodes$: BehaviorSubject<Episode[]>;

  currentPage: number = 1;
  pagesTotal: number = 0;

  constructor(private http: HttpClient, private charactersService: CharactersService) {
    this.#episodes$ = new BehaviorSubject<Episode[]>([]);
  }

  fetchEpisodes() {
    this.http.get<ApiResponse>(`https://rickandmortyapi.com/api/episode/?page=${this.currentPage}`)
      .pipe(
        map(apiRes => {

          this.pagesTotal = apiRes.info.pages;

          return apiRes.results.map(episode => {

            const {id, name, air_date, characters} = episode;

            const ids = findIdsFormUrls(characters);

            const charactersMapped = this.charactersService.getCharactersByIds(ids);

            return {
              id,
              name,
              air_date,
              characters: charactersMapped,
            }
          })
        })
      )
      .subscribe(episodes => {
        this.#episodes$.next(episodes);
      });
  };

  getEpisodes() {

    return this.#episodes$;
  };

  getEpisodeById(id: number) {

    return this.getEpisodes().getValue()
      .find(episode => episode.id === id) || null;
  }

}
