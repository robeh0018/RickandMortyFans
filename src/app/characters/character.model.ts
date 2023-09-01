export interface Character {
  id: number;
  name: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location?: Location;
}

interface Location {
  name: string;
  type: string;
  dimension: string;
}
