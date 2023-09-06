import { StyledChip } from '@components/PokemonCard/PokemonCard';
import { PokemonInfo } from '@models/pokemon.models';
import { PokeColor } from '@models/shared';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  cardImg: { maxWidth: '100%', height: 'auto' },
  types: {
    display: 'flex',
    gap: '10px',
  },
};

export const PokemonCardInfo: React.FC<PokemonInfo> = ({
  name,
  image,
  types,
  ability,
}) => {
  return (
    <Card sx={styles.card}>
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <img src={image} alt={name} style={styles.cardImg} />
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <CardContent>
            <Typography variant="h4" component="h2">
              {name}
            </Typography>
            <Typography sx={styles.types} variant="subtitle1" component="div">
              Types:{' '}
              {types.map((type) => (
                <StyledChip
                  key={type}
                  label={type}
                  type={type as PokeColor}
                  variant="filled"
                />
              ))}
            </Typography>
            <Typography variant="body2" component="p">
              Ability:
            </Typography>
            <ul>
              {ability.map((effects, i) =>
                effects.map(({ effect, short_effect }, j) => (
                  <li key={i + j}>
                    <Typography variant="body2" component="div">
                      <Typography variant="subtitle2">Effect:</Typography>{' '}
                      {effect}
                    </Typography>
                    <Typography variant="body2" component="div">
                      <Typography variant="subtitle2">Short Effect:</Typography>{' '}
                      {short_effect}
                    </Typography>
                  </li>
                )),
              )}
            </ul>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
