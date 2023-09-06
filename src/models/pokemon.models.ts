export interface PokemonList {
  count: number;
  next: string;
  previous?: string;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
  types: string[];
}

interface Language {
  name: string;
  url: string;
}

interface Ability {
  effect: string;
  language: Language;
  short_effect: string;
}

export interface PokemonInfo {
  name: string;
  image: string;
  types: string[];
  ability: Ability[][];
}
