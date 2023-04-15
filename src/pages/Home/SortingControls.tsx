import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

import { UseServerRepositoriesProps } from '../../hooks/use-server-repositories';

export interface SortingControlsProps {
  selectedSortBy: UseServerRepositoriesProps['sortBy'];
  onChange: (sortBy: UseServerRepositoriesProps['sortBy']) => void;
}

const SortingControls = ({
  selectedSortBy,
  onChange,
}: SortingControlsProps) => {
  return (
    <FormControl>
      <FormLabel id="sort-by-label">Sort By</FormLabel>

      <RadioGroup
        row
        aria-labelledby="sort-by-label"
        onChange={(event) =>
          onChange(event.target.value as UseServerRepositoriesProps['sortBy'])
        }
      >
        <FormControlLabel
          value="createdAt"
          control={<Radio />}
          label="Date Created"
          checked={selectedSortBy === 'createdAt'}
        />

        <FormControlLabel
          value="stargazersCount"
          control={<Radio />}
          label="Stars"
          checked={selectedSortBy === 'stargazersCount'}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SortingControls;
