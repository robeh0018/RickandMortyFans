import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from "rxjs";
import {Character} from "../character.model";
import {CharactersService} from "../characters.service";
import {CharacterItemComponent} from "./character-item/character-item.component";
import {NgbPagination, NgbPaginationPages} from "@ng-bootstrap/ng-bootstrap";
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, CharacterItemComponent, NgbPagination, NgbPaginationPages],
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {

  characters$: Observable<Character[]>;
  pagesSize = 0;

  constructor(public charactersService: CharactersService, private localStorageService: LocalStorageService) {

    this.characters$ = new Observable<Character[]>();
  }

  ngOnInit() {

    this.pagesSize = this.charactersService.pagesTotal * 10;
    this.characters$ = this.charactersService.getCharacters();
  }


  onChangePage() {
    this.localStorageService.setData('characterCurrentPage', this.charactersService.currentPage);

    this.charactersService.fetchCharacters();
  }
}
