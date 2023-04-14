import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from '@mui/material';

import getGithubRepositoriesByQuery from '../api/get-github-repositories-by-query';
import { GithubRepository } from '../models/github-repository';

/**
 * A custom hook that searches for GitHub repositories based on a search query.
 * This hook debounces the search with a delay of 300ms to reduce unnecessary requests.
 */
const useGithubRepositories = (
  /** The search query used to search for GitHub repositories. */
  searchQuery: string
): {
  /** A boolean indicating whether the data is being fetched */
  isLoading: boolean;
  /** An array of GithubRepository objects matching the search query */
  repositories: GithubRepository[];
  /** A function to clear the list of repositories */
  clear: () => void;
} => {
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);

  const clear = useCallback(() => setRepositories([]), []);

  const { data, refetch, isFetching } = useQuery<GithubRepository[]>(
    ['searchRepositories', searchQuery],
    async () => getGithubRepositoriesByQuery(searchQuery),
    { enabled: false }
  );

  // add debounce to prevent unnecessary requests as the user types. Disable the
  // eslint warning because `debounce` usage causes a false positive
  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(debounce(refetch, 300), [refetch]);

  // refetch when the search query changes
  useEffect(() => {
    if (!searchQuery) return;

    debouncedRefetch();
  }, [searchQuery, debouncedRefetch]);

  useEffect(() => {
    if (!data) return;

    setRepositories(data);
  }, [data]);

  return { isLoading: isFetching, repositories, clear };
};

export default useGithubRepositories;
