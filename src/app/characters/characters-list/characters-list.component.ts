import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from "rxjs";
import {Character} from "../character.model";
import {CharactersService} from "../characters.service";
import {CharacterItemComponent} from "./character-item/character-item.component";


@Component({
    selector: 'app-characters-list',
    standalone: true,
    imports: [CommonModule, CharacterItemComponent],
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {

    characters$: Observable<Character[]>;

    constructor(private charactersService: CharactersService) {

        this.characters$ = new Observable<Character[]>();
    }

    ngOnInit() {
        this.characters$ = this.charactersService.getCharacters();
    }


}
