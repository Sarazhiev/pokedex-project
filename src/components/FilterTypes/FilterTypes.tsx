import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const styles = {
  form: { m: 1, width: 300 },
  select: { display: 'flex', flexWrap: 'wrap', gap: 0.5 },
};

interface FilterTypesProps {
  sortType: string[];
  setSortType: (value: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const types = [
  'normal',
  'grass',
  'fire',
  'water',
  'bug',
  'electric',
  'rook',
  'ghost',
  'poison',
  'psychic',
  'fighting',
  'ground',
  'dragon',
];
export const FilterTypes: React.FC<FilterTypesProps> = ({
  sortType,
  setSortType,
}) => {
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof sortType>) => {
    const {
      target: { value },
    } = event;
    setSortType(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <FormControl sx={styles.form}>
      <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={sortType}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Filter" />}
        renderValue={(selected) => (
          <Box sx={styles.select}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {types.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, sortType, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
