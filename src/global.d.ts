import { PokeTypeColors } from '@models/shared';

declare module '@mui/material/styles' {
  interface Theme {
    pokeColors: PokeTypeColors;
  }
  interface ThemeOptions {
    pokeColors: PokeTypeColors;
  }
}
