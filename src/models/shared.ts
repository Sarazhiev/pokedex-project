export type PokeTypeColors = {
  grass: string;
  normal: string;
  fire: string;
  water: string;
  electric: string;
  ice: string;
  fighting: string;
  poison: string;
  ground: string;
  flying: string;
  psychic: string;
  bug: string;
  rock: string;
  ghost: string;
  dragon: string;
  dark: string;
  steel: string;
  fairy: string;
};

export type PokeColor = keyof PokeTypeColors;
