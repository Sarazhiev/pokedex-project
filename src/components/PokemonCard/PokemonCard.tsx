import { PokeColor } from '@models/shared';
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  styled,
  Typography,
} from '@mui/material';

const styles = {
  card: {
    cursor: 'pointer',
  },
  cardImg: { padding: '1em 1em 0 1em', objectFit: 'contain' },
};

interface PokemonCardProps {
  url: string;
  name: string;
  types: string[];
  onOpenInfo(name: string): void;
}

export const StyledChip = styled(Chip)<{ type: PokeColor }>(
  ({ theme, type }) => ({
    color: 'white',
    backgroundColor: theme.pokeColors[type],
  }),
);

export const PokemonCard: React.FC<PokemonCardProps> = ({
  url,
  name,
  types,
  onOpenInfo,
}) => {
  return (
    <Card sx={styles.card} onClick={() => onOpenInfo(name)}>
      <CardMedia
        component="img"
        height="250"
        sx={styles.cardImg}
        image={url}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Stack direction="row" spacing={1}>
          {types.map((type) => (
            <StyledChip
              key={type}
              label={type}
              type={type as PokeColor}
              variant="filled"
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
