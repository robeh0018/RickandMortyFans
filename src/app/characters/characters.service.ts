import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Character} from "./character.model";
import {LocalStorageService} from "../services/local-storage.service";

interface ApiResponse {
  "info": {
    "count": number,
    "pages": number,
    "next": string,
    "prev": string
  },
  "results": Result[]
}

interface Result {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
}


@Injectable({providedIn: "root"})

export class CharactersService {

  #characters$: BehaviorSubject<Character[]>;

  currentPage = 1;
  pagesTotal: number = 0;


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.#checkStore();

    this.#characters$ = new BehaviorSubject<Character[]>([]);
  }


  fetchCharacters() {
    this.http.get<ApiResponse>(`https://rickandmortyapi.com/api/character/?page=${this.currentPage}`)
      .pipe(
        map(apiRes => {
          this.pagesTotal = apiRes.info.pages;

          return apiRes.results.map(result => {
            const {location, ...rest} = result;

            return {
              ...rest,
              location: location.name,
            };
          });

        })
      )
      .subscribe(results => {
        this.#characters$.next(results)
      })

  };

  fetchCharactersByIds(ids: number[]) {

    const {charactersFounds, idsNotFound} = this.#getCharactersInAndOut(ids)

    return this.http.get<Result[]>(`https://rickandmortyapi.com/api/character/${idsNotFound}`)
      .pipe(
        map(results => results.map(
          result => {
            const {location, ...rest} = result;

            return {...rest, location: location.name}
          }
        )),
        map(characters => {
          return [
            ...charactersFounds,
            ...characters,
          ]
        })
      )
  }

  getCharacters() {
    return this.#characters$;
  };

  getCharacterById(id: number) {

    return this.getCharacters().getValue()
      .find(character => character.id === id) || null;
  };

  #getCharactersInAndOut(ids: number[]) {

    let characters: Character[] = [];
    let idsNotFound: number[] = [];

    ids.forEach(id => {
      const characterFound = this.getCharacterById(id);
      if (characterFound) {
        characters = [...characters, characterFound];
      } else {
        idsNotFound = [...idsNotFound, id]
      }
    })

    return {
      charactersFounds: characters,
      idsNotFound: idsNotFound,
    };
  };

  #checkStore() {
    const storedCurrentPage = this.localStorageService.getData('characterCurrentPage');
    this.currentPage = (!storedCurrentPage) ? 1 : storedCurrentPage;
  }
  ;
}
