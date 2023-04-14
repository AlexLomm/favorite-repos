import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';

import useGithubRepositories from '../hooks/use-github-repositories';
import GithubRepositoriesSearchItem from './GithubRepositoriesSearchItem';

const GithubRepositoriesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, repositories } = useGithubRepositories(searchQuery);

  return (
    <Autocomplete
      disablePortal
      id="repositories"
      sx={{ width: 300 }}
      options={repositories}
      renderInput={(params) => <TextField {...params} label="Search" />}
      loading={isLoading}
      onInputChange={(_, value) => {
        if (!value) return;

        setSearchQuery(value);
      }}
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
