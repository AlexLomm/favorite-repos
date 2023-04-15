import { Autocomplete, Paper, TextField } from '@mui/material';
import React from 'react';

import RepositoryCard from '../../components/RepositoryCard';
import { GithubRepository } from '../../models/github-repository';

export interface GithubRepositoriesSearch {
  isLoading: boolean;
  repositories: GithubRepository[];
  onInputChange: (value: string) => void;
  onRepositoryClick: (repository: GithubRepository) => void;
  disabled: boolean;
}

const GithubRepositoriesSearch = ({
  isLoading,
  repositories,
  onInputChange,
  onRepositoryClick,
  disabled,
}: GithubRepositoriesSearch) => (
  <Paper elevation={1}>
    <Autocomplete
      disabled={disabled}
      disablePortal
      id="repositories"
      sx={{ width: 300 }}
      options={repositories}
      renderInput={(params) => <TextField {...params} label="Search" />}
      loading={isLoading}
      clearOnBlur={false}
      onInputChange={(_, value) => onInputChange(value)}
      getOptionLabel={({ fullName }) => fullName}
      renderOption={(htmlProps, githubRepository) => (
        <RepositoryCard
          key={githubRepository.id}
          elevation={0}
          id={githubRepository.id}
          fullName={githubRepository.fullName}
          language={githubRepository.language}
          stargazersCount={githubRepository.stargazersCount}
          description={githubRepository.description}
          onClick={() => onRepositoryClick(githubRepository)}
        />
      )}
    />
  </Paper>
);

export default GithubRepositoriesSearch;
