import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {CharactersService} from "../characters.service";
import {Character} from "../character.model";


@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})

export class CharacterDetailsComponent implements OnInit {

  character: Character;

  constructor(private route: ActivatedRoute, private charactersService: CharactersService) {
    this.character = {
      id: -1,
      name: '',
      image: '',
      status: '',
      gender: '',
      type: '',
      species: '',
      location: '',
    }
  }

  ngOnInit() {

    this.route.params
      .subscribe(params => {

          this.character = this.charactersService.getCharacterById(+params['id'])!
        }
      );

  };
}
