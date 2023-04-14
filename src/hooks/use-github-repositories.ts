import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

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

const useGithubRepositories = (search: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);

  const { data, refetch } = useQuery(
    ['searchRepositories', search],
    async () => {
      setIsLoading(true);

      let data;

      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(
            search
          )}`,
          { headers: { Accept: 'application/vnd.github+json' } }
        );

        data = await response.json();
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }

      return data;
    },
    { enabled: false }
  );

  useEffect(() => {
    if (search) refetch();
  }, [search, refetch]);

  useEffect(() => {
    if (!data) return;

    const parsedData = data.map((repo: unknown) =>
      githubRepositorySchema.parse(repo)
    );

    setRepositories(parsedData);
  }, [data]);

  return { isLoading, repositories };
};

export default useGithubRepositories;
