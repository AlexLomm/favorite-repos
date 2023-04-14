import React from 'react';
import { css } from '@emotion/react';
import useGithubRepositoriesFromServer from '../../hooks/use-github-repositories-from-server';
import GithubRepositoryCard from '../../components/GithubRepositoryCard';
import removeGithubRepositoryFromServer from '../../api/remove-github-repository-from-server';

const SavedRepositories = () => {
  const { repositories } = useGithubRepositoriesFromServer();

  return (
    <div
      css={css`
        padding: 8px;
      `}
    >
      {repositories.map((repository) => (
        <GithubRepositoryCard
          key={repository.id}
          githubRepository={repository}
          onClick={() => removeGithubRepositoryFromServer(repository.id)}
        />
      ))}
    </div>
  );
};

export default SavedRepositories;
