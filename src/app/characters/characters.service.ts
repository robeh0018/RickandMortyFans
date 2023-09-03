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
  "results": Character[]
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

          return apiRes.results;
        })
      )
      .subscribe(results => {
        this.#characters$.next(results)
      })

  }

  getCharacters() {
    return this.#characters$;
  };

  getCharacterById(id: number) {

    return this.getCharacters().getValue()
      .find(character => character.id === id) || null;
  }

  getCharactersByIds(ids: number[]) {

    let newCharacters: Character[] = [];


    ids.forEach(id => {
      const characterFound = this.getCharacterById(id);
      if (characterFound) {
        newCharacters = [...newCharacters, characterFound];
      }
    })

    return newCharacters;
  };


  #checkStore() {
    const storedCurrentPage = this.localStorageService.getData('characterCurrentPage');
    this.currentPage = (!storedCurrentPage) ? 1 : storedCurrentPage;
  };
}
