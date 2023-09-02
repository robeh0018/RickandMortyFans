import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Character} from "./character.model";

interface ApiResponse {
    "info": {
        "count": number,
        "pages": number,
        "next": string,
        "prev": string
    },
    "results": Character[]
}


@Injectable({providedIn: "root"})

export class CharactersService {

    #characters$: BehaviorSubject<Character[]>;


    constructor(private http: HttpClient) {
        this.#characters$ = new BehaviorSubject<Character[]>([]);
    }


    fetchCharacters() {
        this.http.get<ApiResponse>('https://rickandmortyapi.com/api/character')
            .pipe(
                map(apiRes => apiRes.results)
            )
            .subscribe(results => {
                this.#characters$.next(results)
            })

    }

    getCharacters() {
        return this.#characters$;
    };

    getCharacterById(id: number) {

        return this.getCharacters().getValue().find(character => character.id === id);
    }

    findCharactersByIds(ids: number[]) {

        let newCharacters: Character[] = [];

        for (const id of ids) {
            const characterFound = this.getCharacterById(id);
            if (characterFound) {
                newCharacters = [...newCharacters, characterFound];
            }
        }

        return newCharacters;
    };

}
