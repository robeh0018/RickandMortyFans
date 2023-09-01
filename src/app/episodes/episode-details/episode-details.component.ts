import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Episode} from "../episode.model";
import {EpisodesService} from "../episodes.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-episode-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css'],
})
export class EpisodeDetailsComponent implements OnInit {

  episode: Episode;

  constructor(
    private episodesService: EpisodesService,
    private route: ActivatedRoute) {

    this.episode = {
      id: -1,
      air_date: '',
      characters: [],
      name: '',
    }
  };

  ngOnInit() {

    this.route.params.pipe(
      map(params => params['id'])
    )
      .subscribe(id => {

        this.episode = this.episodesService.getEpisodeById(+id)!;

      });
  };


}
