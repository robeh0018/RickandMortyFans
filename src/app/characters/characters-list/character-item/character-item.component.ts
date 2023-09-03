import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Character} from "../../character.model";
import {RouterLink} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

import {fadeIn} from "../../../animations/fideInAnimation";

@Component({
  selector: 'app-character-item',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbTooltip, NgOptimizedImage],
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
      status: '',
      species: '',
      gender: '',
      type: '',
      location: '',
    }
  }
}
