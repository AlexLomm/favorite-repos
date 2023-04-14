import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';

import useGithubRepositories from '../../hooks/use-github-repositories';
import GithubRepositoryCard from '../../components/GithubRepositoryCard';
import addGithubRepositoryToServer from '../../api/add-github-repository-to-server';

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
      clearOnBlur={false}
      onInputChange={(_, value) => {
        if (!value) {
          clear();

          return;
        }

        setSearchQuery(value);
      }}
      getOptionLabel={({ fullName }) => fullName}
      renderOption={(htmlProps, githubRepository) => (
        <GithubRepositoryCard
          key={githubRepository.id}
          githubRepository={githubRepository}
          onClick={(githubRepository) =>
            addGithubRepositoryToServer(githubRepository)
          }
        />
      )}
    />
  );
};

export default GithubRepositoriesSearch;
