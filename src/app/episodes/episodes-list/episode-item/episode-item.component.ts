import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Episode} from "../../episode.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EpisodesService} from "../../episodes.service";

@Component({
    selector: 'app-episode-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './episode-item.component.html',
    styleUrls: ['./episode-item.component.css'],
    providers: []
})
export class EpisodeItemComponent {

    @Input() episode: Episode;

    constructor(private episodesService: EpisodesService, private router: Router, private route: ActivatedRoute) {

        this.episode = {
            id: -1,
            name: '',
            air_date: '',
            characters: [],
        }
    };

    onSelect(id: number) {

        this.router.navigate([id], {relativeTo: this.route})
    };

}