import { useQuery } from '@tanstack/react-query';

import { GithubRepository } from '../models/github-repository';
import getGithubRepositoriesFromServer from '../api/get-github-repositories-from-server';

/**
 * A custom hook that gets all the repositories from the server
 */
const useGithubRepositories = (): {
  isLoading: boolean;
  repositories: GithubRepository[];
} => {
  const { data, isFetching } = useQuery<GithubRepository[]>(
    ['getRepositoriesFromServer'],
    async () => getGithubRepositoriesFromServer()
  );

  return { repositories: data ?? [], isLoading: isFetching };
};

export default useGithubRepositories;
