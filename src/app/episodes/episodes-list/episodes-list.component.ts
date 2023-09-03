import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EpisodesService} from "../episodes.service";
import {Observable} from "rxjs";
import {Episode} from "../episode.model";
import {EpisodeItemComponent} from "./episode-item/episode-item.component";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {LocalStorageService} from "../../shared/services/local-storage.service";


@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [CommonModule, EpisodeItemComponent, NgbPaginationModule],
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css'],
})
export class EpisodesListComponent implements OnInit {

  pagesSize = 0;
  episodes$: Observable<Episode[]>;

  constructor(public episodesService: EpisodesService,
              private localStorageService: LocalStorageService
  ) {

    this.episodes$ = new Observable<Episode[]>();
  };

  ngOnInit() {

    this.pagesSize = this.episodesService.pagesTotal * 10;

    this.episodes$ = this.episodesService.getEpisodes();
  };

  onChangePage() {

    this.localStorageService.setData('episodesCurrentPage', this.episodesService.currentPage);

    this.episodesService.fetchEpisodes()
  }
}
