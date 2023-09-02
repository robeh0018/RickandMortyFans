import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Character} from "../../character.model";
import {RouterLink} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

import {fadeIn} from "../../../animations/fideInAnimation";

@Component({
  selector: 'app-character-item',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbTooltip],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeIn],
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent {

  @Input() character: Character;

  constructor() {
    this.character = {
      id: -1,
      name: '',
      image: '',
      species: '',
      gender: '',
      type: '',
      location: {
        name: '',
        type: '',
        dimension: '',
      }
    }
  }
}
