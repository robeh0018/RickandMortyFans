import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Episode} from "../episode.model";
import {EpisodesService} from "../episodes.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {CharactersService} from "../../characters/characters.service";
import {Character} from "../../characters/character.model";

@Component({
  selector: 'app-episode-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css'],
})
export class EpisodeDetailsComponent implements OnInit {

  episode: Episode;
  characters: Character[] = [];

  constructor(
    private episodesService: EpisodesService,
    private route: ActivatedRoute,
    private charactersService: CharactersService) {

    this.episode = {
      id: -1,
      air_date: '',
      charactersIds: [],
      name: '',
    }
  };

  ngOnInit() {

    this.route.params.pipe(
      map(params => params['id'])
    )
      .subscribe(id => {

        this.episode = this.episodesService.getEpisodeById(+id)!;

        this.charactersService.fetchCharactersByIds(this.episode.charactersIds).subscribe(
          character => {

            this.characters = character;
          }
        )
      });
  };


}
