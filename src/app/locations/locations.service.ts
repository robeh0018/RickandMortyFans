import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, retry, throwError} from "rxjs";
import {Location} from "./location.model";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "../shared/services/local-storage.service";


interface ApiResponse {
    "info": {
        "count": number,
        "pages": number,
        "next": string,
        "prev": string
    },
    "results": { id: number, name: string, type: string, dimension: string, residents: string[] }[]
}

@Injectable({providedIn: "root"})

export class LocationsService {

    #locations$: BehaviorSubject<Location[]>;

    currentPage: number = 1;
    totalPage: number = 0;


    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService) {

        this.#locations$ = new BehaviorSubject<Location[]>([]);

        this.#checkStore();
    }

    fetchLocations() {
        this.http.get<ApiResponse>(`https://rickandmortyapi.com/api/location/?page=${this.currentPage}`)
            .pipe(
                map(apiRes => {
                    this.totalPage = apiRes.info.pages;

                    return apiRes.results.map(result => {
                        const {residents, ...rest} = result;

                        return {...rest};
                    });
                }),
                retry(3),
                catchError((err) => {
                    return throwError(() => new Error(err))
                }),
            )
            .subscribe(results => {
                this.#locations$.next(results);
            })
    };


    getLocations() {
        return this.#locations$;
    };


    #checkStore() {
        const locationCurrentPage = this.localStorageService.getData('locationCurrentPage');
        this.currentPage = (!locationCurrentPage) ? 1 : locationCurrentPage;
    }
}
