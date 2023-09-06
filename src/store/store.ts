import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { PokemonAPI } from './services/PokemonService';

const rootReduсer = combineReducers({
  [PokemonAPI.reducerPath]: PokemonAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReduсer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(PokemonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReduсer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
