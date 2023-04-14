import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { debounce } from '@mui/material';

export interface GithubRepository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
}

const githubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
});

const useGithubRepositories = (searchQuery: string) => {
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);

  const { data, refetch, isFetching } = useQuery(
    ['searchRepositories', searchQuery],
    async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          searchQuery
        )}`,
        { headers: { Accept: 'application/vnd.github+json' } }
      );

      return await response.json();
    },
    { enabled: false }
  );

  // add debounce to prevent unnecessary requests as the user types
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedRefetch = useCallback(debounce(refetch, 300), [refetch]);

  // refetch when the search query changes
  useEffect(() => {
    if (!searchQuery) return;

    // we don't need to await the refetch here, so we can ignore the eslint warning
    // noinspection JSIgnoredPromiseFromCall
    debouncedRefetch();
  }, [searchQuery, debouncedRefetch]);

  // parse the data and ensure that it matches the schema (this way we
  // can be sure that the ts types match the underlying data)
  useEffect(() => {
    if (!data) return;

    const parsedData = data.items.map((repo: unknown) =>
      githubRepositorySchema.parse(repo)
    );

    setRepositories(parsedData);
  }, [data]);

  return { isLoading: isFetching, repositories };
};

export default useGithubRepositories;
