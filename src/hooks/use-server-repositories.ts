import { useQuery } from '@tanstack/react-query';

import getServerRepositories from '../api/get-server-repositories';
import { ServerRepository } from '../models/server-repository';

export interface UseServerRepositoriesProps {
  /**
   * The property to sort the repositories by.
   *
   * @default 'createdAt'
   */
  sortBy: keyof ServerRepository & ('createdAt' | 'stargazersCount');
}

/**
 * A custom hook that gets all the repositories from the server
 */
const useServerRepositories = ({
  sortBy = 'createdAt',
}: UseServerRepositoriesProps) => {
  const {
    data: dataInitial,
    isFetching,
    refetch,
  } = useQuery<ServerRepository[]>(
    ['getRepositoriesFromServer'],
    getServerRepositories
  );

  const data = dataInitial ?? [];

  data.sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return b[sortBy] - a[sortBy];
  });

  return { repositories: data ?? [], isLoading: isFetching, refetch };
};

export default useServerRepositories;
