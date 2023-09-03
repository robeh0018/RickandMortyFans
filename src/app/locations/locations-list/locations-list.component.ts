import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationItemComponent} from "./location-item/location-item.component";
import {LocationsService} from "../locations.service";
import {Observable} from "rxjs";
import {Location} from "../location.model";
import {NgbPagination, NgbPaginationPages} from "@ng-bootstrap/ng-bootstrap";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, LocationItemComponent, NgbPagination, NgbPaginationPages],
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {

  locations$: Observable<Location[]>;

  pagesSize: number = 0;

  constructor(public locationsService: LocationsService, private localStorageService: LocalStorageService) {
    this.locations$ = new Observable<Location[]>();
  }

  ngOnInit() {
    this.pagesSize = this.locationsService.totalPage * 10;

    this.locations$ = this.locationsService.getLocations();
  }

  onChangePage() {

    this.localStorageService.setData('locationCurrentPage', this.locationsService.currentPage)

    this.locationsService.fetchLocations();
  }
}
