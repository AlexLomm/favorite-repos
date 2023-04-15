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

  const epochString = '1970-01-01T00:00:00.000Z';

  data.sort((a, b) => {
    if (sortBy === 'createdAt') {
      return (
        new Date(a.createdAt ?? epochString).getTime() -
        new Date(b.createdAt ?? epochString).getTime()
      );
    }

    return b[sortBy] - a[sortBy];
  });

  return { repositories: data ?? [], isLoading: isFetching, refetch };
};

export default useServerRepositories;
