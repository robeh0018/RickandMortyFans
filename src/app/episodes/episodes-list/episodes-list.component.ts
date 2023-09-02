import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpisodesService} from "../episodes.service";
import {Observable} from "rxjs";
import {Episode} from "../episode.model";
import {EpisodeItemComponent} from "./episode-item/episode-item.component";

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, EpisodeItemComponent],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css'],
})
export class EpisodesListComponent implements OnInit {

  episodes$: Observable<Episode[]>;

  constructor(private episodesService: EpisodesService) {

    this.episodes$ = new Observable<Episode[]>();
  };

  ngOnInit() {
    this.episodes$ = this.episodesService.getEpisodes();
  };

}
