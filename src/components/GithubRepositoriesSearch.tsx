import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';

import useGithubRepositories from '../hooks/use-github-repositories';
import GithubRepositoriesSearchItem from './GithubRepositoriesSearchItem';

const GithubRepositoriesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, repositories, clear } = useGithubRepositories(searchQuery);

  return (
    <Autocomplete
      disablePortal
      id="repositories"
      sx={{ width: 300 }}
      options={repositories}
      renderInput={(params) => <TextField {...params} label="Search" />}
      loading={isLoading}
      onInputChange={(_, value) => {
        if (!value) {
          clear();

          return;
        }

        setSearchQuery(value);
      }}
      clearOnBlur={false}
      getOptionLabel={(githubRepository) => githubRepository.name}
      renderOption={(htmlProps, githubRepository) => (
        <GithubRepositoriesSearchItem
          key={githubRepository.id}
          githubRepository={githubRepository}
        />
      )}
    />
  );
};

export default GithubRepositoriesSearch;
