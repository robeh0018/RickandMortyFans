import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {CharactersService} from "./characters/characters.service";
import {EpisodesService} from "./episodes/episodes.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  constructor(
    private charactersService: CharactersService,
    private episodesService: EpisodesService,
  ) {
  }

  ngOnInit() {
    this.charactersService.fetchCharacters();
    this.episodesService.fetchEpisodes();
  }
}
