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

  characters$: BehaviorSubject<Character[]>;


  constructor(private http: HttpClient) {
    this.characters$ = new BehaviorSubject<Character[]>([]);
  }


  fetchCharacters() {
    this.http.get<ApiResponse>('https://rickandmortyapi.com/api/character')
      .pipe(
        map(apiRes => apiRes.results)
      )
      .subscribe(results => {
        this.characters$.next(results)
      })

  }

  getCharacters() {
    return this.characters$.getValue().slice();
  };

  findCharactersById(ids: number[]) {

    const characters = this.getCharacters();

    let newCharacters: Character[] = [];

    for (const id of ids) {
      const characterFound = characters.find(character => character.id === id)
      if (characterFound) {
        newCharacters = [...newCharacters, characterFound];
      }
    }

    return newCharacters;
  };

}
