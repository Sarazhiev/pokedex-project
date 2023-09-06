import { projectApi } from '@api/apiConfig';
import { FilterTypes } from '@components/FilterTypes';
import { PokemonCard } from '@components/PokemonCard';
import { PokemonCardInfo } from '@components/PokemonInfoCard';
import { Pokemon, PokemonInfo } from '@models/pokemon.models';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Drawer,
  IconButton,
  TablePagination,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { PokemonAPI } from '@store/services/PokemonService';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const styles = {
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  filter: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  closeBtn: {
    cursor: 'pointer',
  },
};

export const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  const [searchParams] = useSearchParams();
  const [sortType, setSortType] = useState<string[]>([]);
  const [pokemonInfo, setPokemonInfo] = useState<{
    isOpen: boolean;
    pokemon?: PokemonInfo;
  }>({
    isOpen: false,
  });
  const { data, isLoading, isFetching } = PokemonAPI.useFetchAllPokemonsQuery({
    limit: sortType.length || searchParams.get('q') ? 1281 : rowsPerPage,
    offset: page * rowsPerPage,
    search: searchParams.get('q'),
    sort: sortType,
  });
  if (isLoading || isFetching) {
    return (
      <Box sx={styles.spinner}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFetchPokemon = async (name: string) => {
    const { data } = await projectApi.get(`/pokemon/${name}`);

    const ability = await Promise.all(
      data.abilities.map(async (ability: { ability: { name: string } }) => {
        const abilityResponse = await projectApi.get(
          `/ability/${ability.ability.name}`,
        );

        return abilityResponse.data.effect_entries as Array<{
          effect: string;
          short_effect: string;
        }>;
      }),
    );

    const pokemon = {
      name: data.name,
      image: data.sprites.other.home.front_default,
      types: data?.types.map(
        (item: { type: { name: string } }) => item.type.name,
      ),
      ability,
    };

    setPokemonInfo({ isOpen: true, pokemon });
  };

  return (
    <>
      <Box sx={styles.filter}>
        <FilterTypes sortType={sortType} setSortType={setSortType} />
        <Button
          variant="outlined"
          color="error"
          onClick={() => setSortType([])}
        >
          Reset all filters
        </Button>
      </Box>

      <Grid
        container
        padding={2}
        rowSpacing={{ xs: 2, sm: 4, md: 6 }}
        columnSpacing={{ xs: 2, sm: 4, md: 6 }}
      >
        {data?.pokemons &&
          data.pokemons.map((pokemon: Pokemon) => (
            <Grid key={pokemon.name} item xs={6} sm={4} lg={2}>
              <PokemonCard
                url={pokemon.url}
                name={pokemon.name}
                types={pokemon.types}
                onOpenInfo={handleFetchPokemon}
              />
            </Grid>
          ))}
      </Grid>
      {data?.pokemons.length &&
      data?.pokemons.length >= 24 &&
      !sortType.length &&
      searchParams.get('q') === '' ? (
        <TablePagination
          component="div"
          count={Number(data?.count)}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[24, 48, 96]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
      <Drawer
        anchor="bottom"
        open={pokemonInfo.isOpen}
        onClose={() => setPokemonInfo({ isOpen: false })}
      >
        {pokemonInfo?.pokemon && <PokemonCardInfo {...pokemonInfo.pokemon} />}
        <IconButton
          sx={styles.closeBtn}
          onClick={() => setPokemonInfo({ isOpen: false })}
          aria-label="delete"
          color="error"
        >
          <CloseIcon />
        </IconButton>
      </Drawer>
      {!data?.pokemons.length && (
        <Box sx={styles.notFound}>
          <Typography variant="h3">Pokemon not found :(</Typography>
        </Box>
      )}
    </>
  );
};
