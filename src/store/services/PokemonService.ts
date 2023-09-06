import { projectApi } from '@api/apiConfig';
import { Pokemon, PokemonList } from '@models/pokemon.models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PokemonAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL || 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (build) => ({
    fetchAllPokemons: build.query({
      query: ({ limit = 24, offset = 0, search = '', sort = '' }) => ({
        url: 'pokemon',
        method: 'get',
        params: { limit, offset, search, sort },
      }),
      transformResponse: async (
        response: PokemonList,
        _,
        { search, sort },
      ): Promise<{ count: number; pokemons: Pokemon[] }> => {
        const filteredPokemons = response.results.filter((value) =>
          value.name.includes(search || ''),
        );
        const pokemons = await Promise.all(
          filteredPokemons.map(async (pokemon: { name: string }) => {
            const { data } = await projectApi.get(`/pokemon/${pokemon.name}`);
            return {
              name: data.name as string,
              url: data.sprites.other.home.front_default as string,
              types: data?.types.map(
                (item: { type: { name: string } }) => item.type.name,
              ),
            };
          }),
        );

        const filterPokemonsByTypes = (
          pokemon: { types: string },
          typesToFilter: string[],
        ) => typesToFilter.every((type) => pokemon.types.includes(type));

        const sortedPokemons = pokemons.filter((pokemon) =>
          sort.length ? filterPokemonsByTypes(pokemon, sort) : true,
        );

        return { count: response.count, pokemons: sortedPokemons };
      },
    }),
  }),
});
