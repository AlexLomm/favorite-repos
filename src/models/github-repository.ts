import { z } from 'zod';

export interface GithubRepository {
  id: string;
  fullName: string;
  description?: string;
  language?: string;
  stargazersCount: number;
  createdAt?: string;
}

export interface GithubRepositoriesResponse {
  items: GithubRepository[];
}

export const githubRepositorySchema = z
  .object({
    id: z.number(),
    full_name: z.string(),
    description: z.string().nullable(),
    language: z.string().nullable(),
    stargazers_count: z.number(),
    created_at: z.string().nullable(),
  })
  .transform(
    ({ id, full_name, stargazers_count, created_at, ...otherProps }) => ({
      id: `${id}`,
      fullName: full_name,
      stargazersCount: stargazers_count,
      createdAt: created_at,
      ...otherProps,
    })
  );

export const githubRepositoriesResponseSchema = z.object({
  items: z.array(githubRepositorySchema),
});
