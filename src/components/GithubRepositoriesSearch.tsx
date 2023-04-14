import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import useGithubRepositories from '../hooks/use-github-repositories';

const GithubRepositoriesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, repositories } = useGithubRepositories(searchQuery);

  return (
    <Autocomplete
      disablePortal
      id="repositories"
      sx={{ width: 300 }}
      options={repositories.map(({ id, name }) => ({ id, label: name }))}
      renderInput={(params) => <TextField {...params} label="Repository" />}
      inputValue={searchQuery}
      loading={isLoading}
      onInputChange={(_, value) => {
        if (!value) return;

        setSearchQuery(value);
      }}
    />
  );
};

export default GithubRepositoriesSearch;
