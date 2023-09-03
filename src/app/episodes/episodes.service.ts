import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Episode} from "./episode.model";
import {BehaviorSubject, catchError, map, retry, throwError} from "rxjs";
import {findIdsFormUrls} from "../shared/helpers/findIdsFormUrls";
import {LocalStorageService} from "../shared/services/local-storage.service";

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

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService,
    ) {
        this.#checkStore();
        this.#episodes$ = new BehaviorSubject<Episode[]>([]);
    }

    fetchEpisodes() {
        this.http.get<ApiResponse>(`https://rickandmortyapi.com/api/episode/?page=${this.currentPage}`)
            .pipe(
                map(apiRes => {

                    this.pagesTotal = apiRes.info.pages;

                    return apiRes.results
                        .map(episode => {

                            const {characters, ...rest} = episode;

                            const ids = findIdsFormUrls(characters);

                            return {
                                ...rest,
                                charactersIds: ids,
                            };
                        });
                }),
                retry(3),
                catchError((err) => {
                    return throwError(() => new Error(err))
                }),
            )
            .subscribe(episodes => {
                this.#episodes$.next(episodes)
            });
    };

    getEpisodes() {

        return this.#episodes$;
    };

    getEpisodeById(id: number) {

        return this.getEpisodes().getValue()
            .find(episode => episode.id === id) || null;
    }

    #checkStore() {
        const storedCurrentPage = this.localStorageService.getData('episodesCurrentPage');
        this.currentPage = (!storedCurrentPage) ? 1 : storedCurrentPage;
    };

}
