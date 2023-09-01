import {Character} from "../characters/character.model";

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  characters: Character[];
  // url: string
}
