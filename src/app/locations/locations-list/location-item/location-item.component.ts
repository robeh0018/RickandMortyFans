import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Location} from "../../location.model";

@Component({
  selector: 'app-location-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent {
  @Input() location: Location;

  constructor() {
    this.location = {
      id: -1,
      name: '',
      type: '',
      dimension: '',
    }
  }
}
